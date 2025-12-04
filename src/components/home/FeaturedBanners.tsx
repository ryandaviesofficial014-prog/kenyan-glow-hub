import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bannerHampers from "@/assets/banner-hampers.jpg";
import bannerFlowers from "@/assets/banner-flowers.jpg";
import bannerCorporate from "@/assets/banner-corporate.jpg";

const banners = [
  {
    title: "Artisan Hampers",
    subtitle: "Exquisitely assembled gift bundles for any celebration",
    image: bannerHampers,
    color: "from-purple-600/80 to-pink-600/80",
    href: "/category/gift-hampers",
  },
  {
    title: "Floral Elegance",
    subtitle: "Hand-crafted arrangements delivered to your doorstep today",
    image: bannerFlowers,
    color: "from-pink-600/80 to-rose-600/80",
    href: "/category/flowers",
  },
  {
    title: "Business Gifting",
    subtitle: "Delight clients and celebrate your team in style",
    image: bannerCorporate,
    color: "from-violet-600/80 to-purple-600/80",
    href: "/corporate",
  },
];

const FeaturedBanners = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <Link
              key={banner.title}
              to={banner.href}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanners;
