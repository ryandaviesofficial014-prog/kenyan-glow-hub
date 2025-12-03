import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[400px] md:min-h-[500px]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gold rounded-full animate-pulse-soft" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
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
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-full shadow-hover transition-all hover:scale-105">
              Explore Holiday Range
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-base font-semibold rounded-full border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all">
              Shop All Gifts
            </Button>
          </div>
        </div>
      </div>

      {/* Gift hamper image placeholder */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
        <div className="relative w-full h-full flex items-end justify-center">
          <div className="w-96 h-96 bg-gradient-to-br from-gold-light/30 to-gold/20 rounded-full blur-2xl absolute" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
