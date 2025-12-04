import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Users, Gift, Award, CheckCircle, ArrowRight } from "lucide-react";
import bannerCorporate from "@/assets/banner-corporate.jpg";

const benefits = [
  {
    icon: Building2,
    title: "Volume Pricing",
    description: "Enjoy significant savings on large quantity orders with our tiered pricing structure",
  },
  {
    icon: Users,
    title: "Team Recognition",
    description: "Celebrate achievements and milestones with memorable gifts your staff will treasure",
  },
  {
    icon: Gift,
    title: "Brand Personalization",
    description: "Incorporate your corporate identity and heartfelt messages into every package",
  },
  {
    icon: Award,
    title: "Partner Relations",
    description: "Nurture valuable business connections with sophisticated, curated presents",
  },
];

const features = [
  "Dedicated account manager",
  "Custom gift curation",
  "Flexible delivery schedules",
  "Branded packaging options",
  "Invoice payment terms",
  "Detailed reporting",
];

const Corporate = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with an email service
    alert("Thank you for your inquiry! Our corporate team will contact you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bannerCorporate}
              alt="Corporate gifts"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>
          <div className="container relative z-10 py-16 md:py-24">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Business <span className="text-gradient">Gifting Excellence</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Strengthen professional bonds with sophisticated, handpicked presents. Whether celebrating milestones or thanking valued partners, we simplify the art of corporate generosity.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#inquiry">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 px-8 py-6 text-base font-semibold rounded-full">
                    Get a Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/products">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-base font-semibold rounded-full">
                    Browse Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-center text-foreground mb-12">
              Why Choose Wrapped & Ready for Business?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all animate-slide-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Your Complete Business Gifting Partner
                </h2>
                <p className="text-muted-foreground mb-8">
                  We recognize that every organization has distinct requirements. Our tailored approach ensures effortless large-scale orders without sacrificing the thoughtful details that make each gift special.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-hero rounded-2xl p-8">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <p className="text-lg italic text-foreground mb-4">
                    "Wrapped & Ready revolutionized our staff recognition program. Coordinating gifts for our 200+ team members is now completely effortless!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">MW</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Mary Wanjiku</p>
                      <p className="text-sm text-muted-foreground">People & Culture Lead, Innovate Labs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center text-foreground mb-4">
                Request Your Personalized Proposal
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Share your business gifting vision and our specialists will craft a bespoke plan just for you.
              </p>
              <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-card space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" required className="mt-1" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Estimated Quantity</Label>
                  <Input id="quantity" placeholder="e.g., 50-100 gifts" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Tell us about your needs</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Describe the occasion, budget range, and any specific requirements..."
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 py-6 text-lg">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Corporate;
