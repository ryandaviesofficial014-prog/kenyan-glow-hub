import { Truck, Shield, RefreshCw, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Swift Doorstep Delivery",
    description: "Place your order by noon and receive it the very same day within Nairobi",
  },
  {
    icon: Shield,
    title: "Premium Selection Promise",
    description: "Every item is carefully inspected to ensure exceptional quality",
  },
  {
    icon: RefreshCw,
    title: "Stress-Free Exchanges",
    description: "Not satisfied? Return or exchange within a week, no questions asked",
  },
  {
    icon: HeadphonesIcon,
    title: "Always Here For You",
    description: "Our dedicated team is available around the clock to assist",
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
