import { Truck, Shield, RefreshCw, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Same Day Delivery",
    description: "Order before 2PM for same-day delivery in Nairobi",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Handpicked products with freshness guarantee",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "We're here to help anytime you need us",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform shadow-hover">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
