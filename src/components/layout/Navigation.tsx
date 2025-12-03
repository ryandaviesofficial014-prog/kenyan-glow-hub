import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  mobile?: boolean;
}

const navItems = [
  { label: "Flowers", href: "#flowers", featured: true },
  { label: "Gift Hampers", href: "#hampers", hasDropdown: true },
  { label: "Her", href: "#her", hasDropdown: true },
  { label: "Him", href: "#him", hasDropdown: true },
  { label: "More Gift Ideas", href: "#more", hasDropdown: true },
  { label: "Cards", href: "#cards", hasDropdown: true },
  { label: "Corporate Gifts", href: "#corporate" },
];

const Navigation = ({ mobile = false }: NavigationProps) => {
  return (
    <nav className={cn(
      mobile 
        ? "flex flex-col gap-1" 
        : "flex items-center justify-center gap-1 py-3"
    )}>
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
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
          {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
