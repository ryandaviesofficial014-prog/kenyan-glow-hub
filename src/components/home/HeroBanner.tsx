import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-gift-hamper.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium gift hampers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm font-medium text-foreground/70">Holiday Season Sale</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Send Joy with{" "}
            <span className="text-gradient">Perfect Gifts</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg">
            Discover curated hampers, fresh flowers, and thoughtful gifts for every occasion. Same-day delivery across Kenya.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/category/gift-hampers">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-full shadow-hover transition-all hover:scale-105">
                Explore Holiday Range
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="px-8 py-6 text-base font-semibold rounded-full border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all">
                Shop All Gifts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
