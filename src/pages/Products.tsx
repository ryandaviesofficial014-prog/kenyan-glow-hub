import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const { data: products, isLoading } = useProducts();
  const addItem = useCart((state) => state.addItem);
  const [sortBy, setSortBy] = useState("newest");

  const sortedProducts = products?.slice().sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                All Products
              </h1>
              <p className="text-muted-foreground mt-1">
                {products?.length || 0} products available
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts?.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <Link to={`/product/${product.slug}`} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.is_sale && (
                        <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                          SALE
                        </span>
                      )}
                      {product.is_new && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        KSh {product.price.toLocaleString()}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          KSh {product.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-gradient-primary hover:opacity-90"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (!products || products.length === 0) && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found.</p>
              <Link to="/">
                <Button className="mt-4">Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
