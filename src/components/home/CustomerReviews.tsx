import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    text: "Absolutely stunning arrangement! My mom was thrilled. Will order again!",
    rating: 5,
  },
  {
    name: "James K.",
    text: "Fast delivery and the hamper exceeded expectations. Perfect for corporate gifting.",
    rating: 5,
  },
  {
    name: "Linda W.",
    text: "Beautiful flowers, fresh and fragrant. Made my anniversary extra special.",
    rating: 5,
  },
  {
    name: "David O.",
    text: "Excellent service from start to finish. The packaging was impressive!",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">Trusted by thousands of happy customers</p>
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
