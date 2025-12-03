import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Thoughtful Hampers",
    subtitle: "Curated gift collections for every occasion",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    color: "from-purple-600/80 to-pink-600/80",
    href: "#hampers",
  },
  {
    title: "Fresh Flowers",
    subtitle: "Same-day delivery across Nairobi",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
    color: "from-pink-600/80 to-rose-600/80",
    href: "#flowers",
  },
  {
    title: "Corporate Gifts",
    subtitle: "Impress clients & reward teams",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800",
    color: "from-violet-600/80 to-purple-600/80",
    href: "#corporate",
  },
];

const FeaturedBanners = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <a
              key={banner.title}
              href={banner.href}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-primary-foreground">
                <h3 className="text-2xl font-display font-bold mb-2">{banner.title}</h3>
                <p className="text-sm opacity-90 mb-4">{banner.subtitle}</p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-fit bg-background/20 hover:bg-background/40 text-primary-foreground border-0 backdrop-blur-sm"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanners;
