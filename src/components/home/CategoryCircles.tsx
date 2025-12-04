import { 
  Gift, 
  Wine, 
  Flower2, 
  Sparkles, 
  Gem, 
  BadgeDollarSign, 
  ShoppingBag,
  FileText,
  LucideIcon
} from "lucide-react";
import { useCategories } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  gift: Gift,
  wine: Wine,
  flower2: Flower2,
  sparkles: Sparkles,
  gem: Gem,
  "badge-dollar-sign": BadgeDollarSign,
  "shopping-bag": ShoppingBag,
  "file-text": FileText,
};

const CategoryCircles = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-8 bg-gradient-warm">
        <div className="container">
          <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
                <Skeleton className="w-16 h-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-warm">
      <div className="container">
        <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories?.map((category, index) => {
            const IconComponent = iconMap[category.icon || "gift"] || Gift;
            
            return (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex flex-col items-center gap-2 group animate-slide-up opacity-0`}
                style={{ 
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div 
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-3 border-category-border transition-all duration-300 group-hover:scale-110 group-hover:shadow-hover overflow-hidden"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color})` }}
                  />
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors relative z-10" />
                </div>
                <span className="text-xs md:text-sm font-medium text-center text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
                  {category.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;
