import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

const tabs = ["Flowers", "For Her", "For Him", "New Arrivals"];

const products = {
  Flowers: [
    { id: "1", name: "Seductive Red Roses Bouquet with Assorted Macarons", price: 3800, image: "https://images.unsplash.com/photo-1518882605630-8eb579ebd163?w=600", isNew: true },
    { id: "2", name: "Mum Hit Wonder Bouquet", price: 1350, image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600", hasVariants: true },
    { id: "3", name: "The Ruby Standing Flower Bouquet", price: 6850, image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600" },
    { id: "4", name: "Bloom & Bliss Set", price: 7950, image: "https://images.unsplash.com/photo-1522936239953-4f58b7f47f04?w=600", hasVariants: true },
    { id: "5", name: "The Sweet Pea Bouquet", price: 4000, image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600" },
    { id: "6", name: "Premium Flower Arrangement", price: 3450, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600", hasVariants: true },
    { id: "7", name: "Floral Fiesta Standing Bouquet", price: 5700, image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600" },
    { id: "8", name: "Sunshine Daisy Collection", price: 2800, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600", isSale: true, originalPrice: 3500 },
  ],
  "For Her": [
    { id: "9", name: "Luxurious Spa Gift Set", price: 4500, image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600", isNew: true },
    { id: "10", name: "Rose Gold Jewelry Collection", price: 8900, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600" },
    { id: "11", name: "Designer Handbag Set", price: 12500, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", hasVariants: true },
    { id: "12", name: "Skincare Essentials Hamper", price: 6200, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600" },
    { id: "13", name: "Perfume & Bath Collection", price: 5800, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600" },
    { id: "14", name: "Silk Scarf & Accessories", price: 4200, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600", hasVariants: true },
    { id: "15", name: "Chocolate & Wine Indulgence", price: 7500, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600" },
    { id: "16", name: "Wellness Tea Set", price: 2900, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600", isSale: true, originalPrice: 3800 },
  ],
  "For Him": [
    { id: "17", name: "Executive Watch Gift Set", price: 15000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", isNew: true },
    { id: "18", name: "Premium Whisky Collection", price: 9500, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600" },
    { id: "19", name: "Leather Wallet & Belt Set", price: 6800, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", hasVariants: true },
    { id: "20", name: "Grooming Essentials Kit", price: 4200, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600" },
    { id: "21", name: "Tech Gadgets Hamper", price: 8900, image: "https://images.unsplash.com/photo-1606318313647-137d1f3b4330?w=600" },
    { id: "22", name: "Coffee Lover's Package", price: 3500, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600", hasVariants: true },
    { id: "23", name: "Sports & Fitness Set", price: 5600, image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600" },
    { id: "24", name: "BBQ Master Kit", price: 7200, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600", isSale: true, originalPrice: 9000 },
  ],
  "New Arrivals": [
    { id: "25", name: "Holiday Special Hamper", price: 8500, image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600", isNew: true },
    { id: "26", name: "Festive Celebration Box", price: 6200, image: "https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=600", isNew: true },
    { id: "27", name: "Winter Warmth Collection", price: 4800, image: "https://images.unsplash.com/photo-1512418490979-92798cec1380?w=600", isNew: true },
    { id: "28", name: "Gourmet Treats Basket", price: 5500, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600", isNew: true },
    { id: "29", name: "Artisan Chocolate Box", price: 3200, image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600", isNew: true },
    { id: "30", name: "Candle & Home Fragrance Set", price: 4100, image: "https://images.unsplash.com/photo-1602607714066-b8b5f5e0ef78?w=600", isNew: true },
    { id: "31", name: "Family Game Night Bundle", price: 3800, image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600", isNew: true },
    { id: "32", name: "New Year Celebration Kit", price: 7800, image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600", isNew: true },
  ],
};

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
          Top Gift Ideas
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-full p-1.5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                  activeTab === tab
                    ? "bg-gradient-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products[activeTab as keyof typeof products].map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
