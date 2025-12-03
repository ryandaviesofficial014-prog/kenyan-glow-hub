import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryCircles from "@/components/home/CategoryCircles";
import HeroBanner from "@/components/home/HeroBanner";
import ProductSection from "@/components/home/ProductSection";
import FeaturedBanners from "@/components/home/FeaturedBanners";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <CategoryCircles />
        <HeroBanner />
        <ProductSection />
        <FeaturedBanners />
        <WhyChooseUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
