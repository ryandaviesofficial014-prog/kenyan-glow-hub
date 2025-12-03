import { Search, User, ShoppingCart, Gift, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navigation from "./Navigation";

const Header = () => {
  const [cartCount] = useState(0);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="mt-8">
                <Navigation mobile />
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Gift className="w-10 h-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-[8px] text-destructive-foreground">🎅</span>
              </div>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              <span className="text-secondary">PUR</span>
              <span className="text-primary">PINK</span>
            </span>
          </a>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for cards, gifts and flowers ..."
                className="w-full pl-4 pr-12 py-5 rounded-full border-2 border-border focus:border-primary transition-colors"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-primary hover:opacity-90"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a 
              href="#corporate" 
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Gift className="w-4 h-4" />
              Corporate Gifts
            </a>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {cartCount >= 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for cards, gifts and flowers ..."
              className="w-full pl-4 pr-12 py-3 rounded-full border-2 border-border focus:border-primary"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-primary hover:opacity-90 w-8 h-8"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block border-t border-border">
        <div className="container">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
