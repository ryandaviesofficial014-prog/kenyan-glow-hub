import { Star } from "lucide-react";

const reviews = [
  {
    name: "Grace N.",
    text: "The presentation was immaculate! My sister couldn't stop smiling. Highly recommend!",
    rating: 5,
  },
  {
    name: "Peter K.",
    text: "Reliable and professional. Perfect for our office appreciation event.",
    rating: 5,
  },
  {
    name: "Amina H.",
    text: "Fresh blooms that lasted over a week. Made our anniversary truly memorable.",
    rating: 5,
  },
  {
    name: "John M.",
    text: "From ordering to unboxing, everything was seamless. Top-notch quality!",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Loved By Our Customers
          </h2>
          <p className="text-muted-foreground">Real stories from people we've delighted</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm mb-4 leading-relaxed">"{review.text}"</p>
              <p className="text-sm font-semibold text-primary">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
