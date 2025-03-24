// src/components/discount-banner.jsx
import { Tag, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function DiscountBanner({
  discountPercent = 25,
  title = "Special Discount Event",
  description = "Enjoy 25% off on all furniture items. Limited time offer.",
  code = "FURNISH25",
  bgColor = "bg-primary",
  textColor = "text-primary-foreground",
}) {
  return (
    <div className={`w-full ${bgColor} ${textColor} py-4 px-4 md:px-6`}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-background text-foreground rounded-full h-10 w-10 md:h-12 md:w-12">
              <Tag className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm md:text-base">{description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-background/20 px-3 py-1.5 rounded-md backdrop-blur-sm">
              <span className="font-mono font-bold">{code}</span>
            </div>

            <Link to="/sale">
              <Button variant="secondary" className="whitespace-nowrap">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
