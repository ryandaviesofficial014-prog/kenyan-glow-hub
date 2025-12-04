import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavigationProps {
  mobile?: boolean;
}

const navItems = [
  { 
    label: "Flowers", 
    href: "/category/flowers", 
    featured: true,
  },
  { 
    label: "Gift Hampers", 
    href: "/category/gift-hampers",
    hasDropdown: true,
    children: [
      { label: "Spa Hampers", href: "/category/gift-hampers?type=spa" },
      { label: "Food Hampers", href: "/category/gift-hampers?type=food" },
      { label: "Tea & Coffee", href: "/category/gift-hampers?type=tea" },
    ]
  },
  { 
    label: "For Her", 
    href: "/category/for-her",
    hasDropdown: true,
    children: [
      { label: "Perfumes", href: "/category/for-her?type=perfume" },
      { label: "Jewelry", href: "/category/for-her?type=jewelry" },
      { label: "Accessories", href: "/category/for-her?type=accessories" },
    ]
  },
  { 
    label: "For Him", 
    href: "/category/for-him",
    hasDropdown: true,
    children: [
      { label: "Whisky & Spirits", href: "/category/for-him?type=spirits" },
      { label: "Grooming", href: "/category/for-him?type=grooming" },
      { label: "Leather Goods", href: "/category/for-him?type=leather" },
    ]
  },
  { 
    label: "More Gifts", 
    href: "/products",
    hasDropdown: true,
    children: [
      { label: "Chocolates", href: "/category/chocolates" },
      { label: "Cakes", href: "/category/cakes" },
      { label: "Wine & Spirits", href: "/category/wine-spirits" },
      { label: "Plants", href: "/category/plants" },
    ]
  },
  { label: "Cards", href: "/category/cards" },
  { label: "Corporate Gifts", href: "/corporate" },
];

const Navigation = ({ mobile = false }: NavigationProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  if (mobile) {
    return (
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.hasDropdown && item.children ? (
              <Collapsible
                open={openItems.includes(item.label)}
                onOpenChange={() => toggleItem(item.label)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted hover:text-primary">
                  <span className="flex items-center gap-1">
                    {item.featured && <Sparkles className="w-3 h-3" />}
                    {item.label}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      openItems.includes(item.label) && "rotate-180"
                    )} 
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <Link
                    to={item.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md"
                  >
                    View All {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md"
                    >
                      {child.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  "hover:bg-muted hover:text-primary",
                  item.featured && "text-primary"
                )}
              >
                <span className="flex items-center gap-1">
                  {item.featured && <Sparkles className="w-3 h-3" />}
                  {item.label}
                </span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-center gap-1 py-3">
      {navItems.map((item) => (
        <div key={item.label} className="relative group">
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
              "hover:bg-muted hover:text-primary",
              item.featured && "text-primary"
            )}
          >
            <span className="flex items-center gap-1">
              {item.featured && <Sparkles className="w-3 h-3" />}
              {item.label}
            </span>
            {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
          </Link>
          
          {item.hasDropdown && item.children && (
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                <Link
                  to={item.href}
                  className="block px-4 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
                >
                  View All {item.label}
                </Link>
                <div className="border-t border-border my-1"></div>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
