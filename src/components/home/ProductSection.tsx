import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { useFeaturedProducts, useNewProducts, useSaleProducts, useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = ["Featured", "New Arrivals", "On Sale", "All Products"];

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: featuredProducts, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: newProducts, isLoading: newLoading } = useNewProducts();
  const { data: saleProducts, isLoading: saleLoading } = useSaleProducts();
  const { data: allProducts, isLoading: allLoading } = useProducts();

  const getActiveProducts = () => {
    switch (activeTab) {
      case "Featured":
        return featuredProducts || [];
      case "New Arrivals":
        return newProducts || [];
      case "On Sale":
        return saleProducts || [];
      case "All Products":
        return (allProducts || []).slice(0, 8);
      default:
        return [];
    }
  };

  const isLoading = 
    (activeTab === "Featured" && featuredLoading) ||
    (activeTab === "New Arrivals" && newLoading) ||
    (activeTab === "On Sale" && saleLoading) ||
    (activeTab === "All Products" && allLoading);

  const products = getActiveProducts();

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
          Curated Selections
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-full p-1.5 gap-1 flex-wrap justify-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                  activeTab === tab
                    ? "bg-gradient-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.original_price || undefined}
                  image={product.image_url || "https://images.unsplash.com/photo-1518882605630-8eb579ebd163?w=600"}
                  hasVariants={product.has_variants || false}
                  isNew={product.is_new || false}
                  isSale={product.is_sale || false}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
