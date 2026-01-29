import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Truck,
  Package,
  MapPin,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const ShippingPolicy = () => {
  const deliveryZones = [
    { fare: 1000, areas: ["Kahawa Sukari", "Kahawa Wendani"] },
    { fare: 1500, areas: ["Githurai 45", "Baracks"] },
    {
      fare: 2000,
      areas: [
        "Bypass - Kamakis - corner - OJ",
        "Kwa Kairu - Kimbo",
        "Membley - Tatu City - Ruiru town",
        "Carwash - Roysambu - Mwikki",
        "Roasters - Zimmerman - Githurai 44 - Kahawa West",
        "Mwihoko",
      ],
    },
    {
      fare: 2500,
      areas: [
        "Witeithie - Juja - Kroad - Toll",
        "Pangani - Muthaiga - allsops",
        "Babadogo - Lucky summer - Njiru",
      ],
    },
    {
      fare: 3000,
      areas: [
        "Thika - Kiambu - Ruaka",
        "Muchatha - Parkland - Nairobi CBD",
        "Kariobangi - Umoja - Donholm - Buruburu",
        "Embakasi - Utawala - Ruai - Chokaa",
      ],
    },
    {
      fare: 3500,
      areas: [
        "Makongeni - Landless",
        "Westland - Kangemi - Uthiru - Kinoo - Muthiga",
        "Kileleshwa - Lavington - Kawangware - Ngong to Racecourse",
        "Kitsuru - Gachie - Wagige - Lower Kabete - Banana",
        "Langata - South B & C - Imara Daima",
      ],
    },
    {
      fare: 4000,
      areas: [
        "Kikuyu - Karen - Kenol",
        "Syokimau - Mlolongo - Athi River - Kamulu - Joska",
      ],
    },
    {
      fare: 4500,
      areas: ["Ngong Town", "Rongai Town", "Kitengela Town", "Malaa"],
    },
  ];

  const sections = [
    {
      title: "Delivery Coverage",
      icon: MapPin,
      content: `We deliver to selected areas within the Nairobi region and surrounding towns. Delivery is only available to the zones listed below. Our team will confirm your delivery zone during checkout.

Standard Delivery:
- Nairobi Metropolitan Areas: 2-3 business days
- Surrounding Towns (Thika, Kiambu, Ruaka, etc.): 3-4 business days
- Outskirts (Kitengela, Rongai, Ngong, Karen, etc.): 4-5 business days

Delivery times are estimates and not guaranteed. Unforeseen circumstances may cause delays.`,
    },
    {
      title: "Shipping Costs",
      icon: Truck,
      content: `Shipping costs are determined by your selected delivery location at checkout and are fixed per zone (not based on weight). Each delivery zone has a specific shipping fare displayed in the Delivery Zones table below. 

The exact shipping cost will be calculated and displayed at checkout before you complete your purchase, allowing you to review and confirm the fee. Once you select your delivery area, the corresponding shipping fare will be applied to your order.`,
    },
    {
      title: "Order Processing",
      icon: Package,
      content: `Order Processing Time:
      - Orders are processed within 1-2 business days (Monday-Friday, 9 AM - 5 PM EAT)
      - Orders placed on weekends or public holidays will be processed the next business day
      - You will receive an order confirmation email with tracking information
      - Tracking numbers allow you to monitor your shipment in real-time`,
    },
    {
      title: "Delivery & Installation",
      content: `Standard Delivery:
      - Our delivery team will deliver your furniture to your specified address
      - Delivery is to the door/entrance of your premises
      - Standard delivery does not include assembly or installation
      
      White-Glove Delivery (Available for Additional Fee):
      - Includes delivery, placement in desired room, and assembly
      - Professional installation and setup of your furniture
      - Removal of packaging materials
      - Please select this option during checkout if desired`,
    },
    {
      title: "Damage During Shipping",
      icon: AlertTriangle,
      content: `Upon delivery, please inspect your furniture immediately:
      - Check for visible damage or defects
      - Take photos/videos if damage is found
      - Report any damage within 24 hours via email or phone
      - Do not refuse delivery; accept the item and report damage immediately
      
      We are not responsible for damage caused by:
      - Improper handling by the customer after delivery
      - Natural wear and tear
      - Failure to follow assembly instructions`,
    },
    {
      title: "Failed Delivery Attempts",
      content: `If a delivery attempt fails:
      - Our team will attempt delivery again on the next available date
      - We will contact you to reschedule
      - After 3 failed attempts, we may cancel the order and issue a refund
      - Please ensure someone is available during business hours to receive your order`,
    },
    {
      title: "Custom & Large Items",
      icon: CheckCircle,
      content: `For custom-made furniture or large items:
      - Longer delivery times (2-4 weeks) may apply
      - Production begins after order confirmation and payment
      - You will be notified of estimated completion and shipping dates
      - Special arrangements may be required for delivery (elevator access, etc.)`,
    },
    {
      title: "International Shipping",
      content: `We currently do not offer international shipping outside Kenya. However, we may provide recommendations for international logistics services upon request.`,
    },
    {
      title: "Lost or Missing Packages",
      content: `In the rare event of a lost package:
      - Report immediately with tracking number and photos
      - We will investigate with the shipping carrier
      - Replacement or refund will be issued once investigation confirms loss
      - Investigation may take up to 30 days`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg text-gray-600">
            Learn about our delivery process, shipping costs, and what to expect
            when your furniture arrives.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: January 2025
          </p>
        </div>

        {/* Delivery Zones Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-blue-600" />
              Delivery Zones & Shipping Fares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {deliveryZones.map((zone, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-600 pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Zone {index + 1}
                    </h4>
                    <Badge className="bg-blue-600 text-white">
                      KES {zone.fare.toLocaleString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {zone.areas.join(", ")}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-6 pt-6 border-t">
              *Shipping fares are fixed per delivery zone and apply to all
              orders. Select your delivery area at checkout to confirm your
              shipping cost.
            </p>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  {section.icon && (
                    <section.icon className="h-5 w-5 mr-3 text-blue-600" />
                  )}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Card */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Can I change my delivery address after placing an order?
              </h4>
              <p className="text-gray-600">
                Please contact us immediately at bobbyfurnitures254@gmail.com
                with your order number. If the order hasn't been shipped, we can
                update the address.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Do you offer same-day delivery?
              </h4>
              <p className="text-gray-600">
                Same-day delivery is available for orders in Nairobi placed
                before 12 PM. Additional fees may apply. Contact us for details.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                What if I'm not home when my furniture arrives?
              </h4>
              <p className="text-gray-600">
                Please ensure someone is available to receive the delivery. Our
                team will call before delivery. If no one is available, we'll
                reschedule.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Do you provide tracking information?
              </h4>
              <p className="text-gray-600">
                Yes! You'll receive a tracking number via email once your order
                ships, allowing you to monitor your delivery in real-time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShippingPolicy;
