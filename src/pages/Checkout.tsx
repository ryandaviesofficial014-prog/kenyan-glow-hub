import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import { useDeliveryZones, usePickupPoints } from "@/hooks/useDelivery";
import { useCreateOrder } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Truck, MapPin, Gift, CreditCard, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { data: deliveryZones } = useDeliveryZones();
  const { data: pickupPoints } = usePickupPoints();
  const createOrder = useCreateOrder();

  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [selectedPickup, setSelectedPickup] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    giftMessage: "",
    deliveryDate: "",
    deliveryTimeSlot: "",
  });

  const selectedDeliveryZone = deliveryZones?.find((z) => z.id === selectedZone);
  const deliveryFee = deliveryType === "delivery" ? (selectedDeliveryZone?.delivery_fee || 0) : 0;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (deliveryType === "delivery" && (!selectedZone || !formData.deliveryAddress)) {
      toast({ title: "Please select delivery zone and enter address", variant: "destructive" });
      return;
    }

    if (deliveryType === "pickup" && !selectedPickup) {
      toast({ title: "Please select a pickup point", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        deliveryType: deliveryType,
        deliveryZoneId: deliveryType === "delivery" ? selectedZone : undefined,
        pickupPointId: deliveryType === "pickup" ? selectedPickup : undefined,
        deliveryAddress: formData.deliveryAddress || undefined,
        recipientName: formData.recipientName || undefined,
        recipientPhone: formData.recipientPhone || undefined,
        giftMessage: formData.giftMessage || undefined,
        deliveryDate: formData.deliveryDate || undefined,
        deliveryTimeSlot: formData.deliveryTimeSlot || undefined,
        deliveryFee: deliveryFee,
      };

      await createOrder.mutateAsync(orderData);
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "You will receive an M-Pesa prompt shortly.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 flex items-center justify-center">
          <div className="text-center py-16">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Your cart is empty</h1>
            <Link to="/products">
              <Button className="bg-gradient-primary hover:opacity-90">Start Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Customer Info */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Your Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="customerPhone">Phone Number (M-Pesa) *</Label>
                      <Input
                        id="customerPhone"
                        name="customerPhone"
                        placeholder="e.g., 0712345678"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Delivery Method
                  </h2>
                  <RadioGroup
                    value={deliveryType}
                    onValueChange={(v) => setDeliveryType(v as "delivery" | "pickup")}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          <span className="font-medium">Home/Office Delivery</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll deliver to your specified address
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">Pickup Point</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Collect from one of our pickup locations
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryType === "delivery" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label>Delivery Zone *</Label>
                        <Select value={selectedZone} onValueChange={setSelectedZone}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select delivery zone" />
                          </SelectTrigger>
                          <SelectContent>
                            {deliveryZones?.map((zone) => (
                              <SelectItem key={zone.id} value={zone.id}>
                                {zone.name} - KSh {zone.delivery_fee.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                        <Textarea
                          id="deliveryAddress"
                          name="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="Enter full delivery address"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {deliveryType === "pickup" && (
                    <div className="mt-6">
                      <Label>Pickup Point *</Label>
                      <Select value={selectedPickup} onValueChange={setSelectedPickup}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select pickup point" />
                        </SelectTrigger>
                        <SelectContent>
                          {pickupPoints?.map((point) => (
                            <SelectItem key={point.id} value={point.id}>
                              {point.name} - {point.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Gift Options */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Gift Details (Optional)
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recipientPhone">Recipient Phone</Label>
                      <Input
                        id="recipientPhone"
                        name="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="giftMessage">Gift Message</Label>
                      <Textarea
                        id="giftMessage"
                        name="giftMessage"
                        value={formData.giftMessage}
                        onChange={handleInputChange}
                        placeholder="Add a personal message for the recipient"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 py-2 border-b border-border last:border-0">
                        <img
                          src={item.product.image_url || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          KSh {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 text-sm mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">KSh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">
                        {deliveryFee > 0 ? `KSh ${deliveryFee.toLocaleString()}` : "Free"}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">KSh {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay with M-Pesa</>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    You'll receive an M-Pesa prompt on your phone
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Checkout;
