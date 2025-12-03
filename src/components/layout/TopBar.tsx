import { Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar text-topbar-foreground py-2">
      <div className="container flex items-center justify-center gap-2 text-sm">
        <span>Call Us</span>
        <a 
          href="tel:+254709953400" 
          className="font-semibold hover:underline flex items-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" />
          0709 953 400
        </a>
      </div>
    </div>
  );
};

export default TopBar;
