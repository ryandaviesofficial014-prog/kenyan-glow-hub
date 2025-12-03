import { 
  Gift, 
  Wine, 
  Flower2, 
  Sparkles, 
  Gem, 
  BadgeDollarSign, 
  ShoppingBag,
  FileText 
} from "lucide-react";

const categories = [
  { 
    name: "Hampers", 
    icon: Gift, 
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-100"
  },
  { 
    name: "Food & Drink", 
    icon: Wine, 
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-100"
  },
  { 
    name: "Flowers", 
    icon: Flower2, 
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-100"
  },
  { 
    name: "Bath & Body", 
    icon: Sparkles, 
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-100"
  },
  { 
    name: "Jewellery", 
    icon: Gem, 
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-100"
  },
  { 
    name: "Under 3K", 
    icon: BadgeDollarSign, 
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-100"
  },
  { 
    name: "Bags & Totes", 
    icon: ShoppingBag, 
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-100"
  },
  { 
    name: "Cards", 
    icon: FileText, 
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-100"
  },
];

const CategoryCircles = () => {
  return (
    <section className="py-8 bg-gradient-warm">
      <div className="container">
        <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex flex-col items-center gap-2 group animate-slide-up opacity-0 stagger-${index + 1}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className={`
                relative w-20 h-20 md:w-24 md:h-24 rounded-full 
                ${category.bgColor}
                flex items-center justify-center
                border-3 border-category-border
                transition-all duration-300
                group-hover:scale-110 group-hover:shadow-hover
                overflow-hidden
              `}>
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                  group-hover:opacity-20 transition-opacity duration-300
                `} />
                <category.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors relative z-10" />
              </div>
              <span className="text-xs md:text-sm font-medium text-center text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;
