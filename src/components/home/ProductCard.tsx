import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  hasVariants?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  hasVariants,
  isNew,
  isSale,
}: ProductCardProps) => {
  const formatPrice = (amount: number) => {
    return `KSh${amount.toLocaleString()}.00`;
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
            New
          </span>
        )}
        {isSale && (
          <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-all opacity-0 group-hover:opacity-100">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            hoverImage && "group-hover:opacity-0"
          )}
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
          />
        )}

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {hasVariants ? (
                <>Choose options</>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to cart
                </>
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-background/90 hover:bg-background"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {hasVariants && "From "}
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
