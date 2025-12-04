import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavigationProps {
  mobile?: boolean;
}

const navItems = [
  { label: "Flowers", href: "/category/flowers", featured: true },
  { label: "Gift Hampers", href: "/category/gift-hampers" },
  { label: "For Her", href: "/category/for-her" },
  { label: "For Him", href: "/category/for-him" },
  { label: "All Products", href: "/products" },
  { label: "Cards", href: "/category/cards" },
  { label: "Corporate Gifts", href: "/corporate" },
];

const Navigation = ({ mobile = false }: NavigationProps) => {
  return (
    <nav className={cn(
      mobile 
        ? "flex flex-col gap-1" 
        : "flex items-center justify-center gap-1 py-3"
    )}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={cn(
            "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
            "hover:bg-muted hover:text-primary",
            item.featured && "text-primary",
            mobile && "justify-between"
          )}
        >
          <span className="flex items-center gap-1">
            {item.featured && <Sparkles className="w-3 h-3" />}
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
