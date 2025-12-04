import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("M-Pesa callback received:", JSON.stringify(body, null, 2));
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    const stkCallback = body.Body?.stkCallback;
    
    if (!stkCallback) {
      console.error("Invalid callback format");
      return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stkCallback;
    
    console.log("Processing callback:", { MerchantRequestID, CheckoutRequestID, ResultCode });
    
    let mpesaReceiptNumber = null;
    let transactionDate = null;
    
    if (ResultCode === 0 && CallbackMetadata?.Item) {
      for (const item of CallbackMetadata.Item) {
        if (item.Name === "MpesaReceiptNumber") {
          mpesaReceiptNumber = item.Value;
        }
        if (item.Name === "TransactionDate") {
          transactionDate = item.Value?.toString();
        }
      }
    }
    
    // Update the transaction record
    const { data: transaction, error: fetchError } = await supabase
      .from("mpesa_transactions")
      .select("*")
      .eq("checkout_request_id", CheckoutRequestID)
      .maybeSingle();
    
    if (fetchError) {
      console.error("Error fetching transaction:", fetchError);
    }
    
    const updateData = {
      status: ResultCode === 0 ? "completed" : "failed",
      result_code: ResultCode,
      result_desc: ResultDesc,
      mpesa_receipt_number: mpesaReceiptNumber,
      transaction_date: transactionDate ? new Date(
        transactionDate.substring(0, 4) + "-" +
        transactionDate.substring(4, 6) + "-" +
        transactionDate.substring(6, 8) + "T" +
        transactionDate.substring(8, 10) + ":" +
        transactionDate.substring(10, 12) + ":" +
        transactionDate.substring(12, 14)
      ).toISOString() : null,
    };
    
    const { error: updateError } = await supabase
      .from("mpesa_transactions")
      .update(updateData)
      .eq("checkout_request_id", CheckoutRequestID);
    
    if (updateError) {
      console.error("Error updating transaction:", updateError);
    }
    
    // If payment was successful, update the order
    if (ResultCode === 0 && transaction?.order_id) {
      const { error: orderError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          mpesa_receipt: mpesaReceiptNumber,
          status: "confirmed",
        })
        .eq("id", transaction.order_id);
      
      if (orderError) {
        console.error("Error updating order:", orderError);
      } else {
        console.log("Order updated successfully:", transaction.order_id);
      }
    }
    
    // M-Pesa expects this response format
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in mpesa-callback:", error);
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
