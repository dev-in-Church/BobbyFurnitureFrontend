import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const ReturnPolicy = () => {
  const returnConditions = [
    {
      condition: "Original Condition",
      description:
        "Furniture must be unused and in the same condition as received (no stains, tears, or damage)",
    },
    {
      condition: "Original Packaging",
      description:
        "All original packaging, documentation, and accessories must be included",
    },
    {
      condition: "Within 14 Days",
      description:
        "Returns must be initiated within 14 days of delivery or purchase",
    },
    {
      condition: "Proof of Purchase",
      description: "Original order confirmation email or invoice is required",
    },
  ];

  const nonReturnableItems = [
    "Custom-made or made-to-order furniture",
    "Items used, damaged, or stained by the customer",
    "Clearance or final sale items",
    "Fabric/upholstered items with visible wear",
    "Items assembled or installed (unless damaged upon arrival)",
  ];

  const sections = [
    {
      title: "Return Eligibility",
      icon: CheckCircle,
      content: `Our 14-day return policy allows you to return most furniture items in original, unused condition. To be eligible for return, items must:
      - Be unused and in original condition
      - Include all original packaging and accessories
      - Have proof of purchase (order confirmation)
      - Be requested within 14 days of delivery
      
      Exceptions may apply to custom orders, clearance items, and assembled furniture.`,
    },
    {
      title: "Non-Returnable Items",
      icon: AlertTriangle,
      content: `The following items cannot be returned:
      • Custom-made or made-to-order furniture
      • Final sale or clearance items (marked at purchase)
      • Used, damaged, or stained furniture
      • Items that have been assembled or installed
      • Upholstered pieces with visible wear or damage
      • Delivery fees and installation charges
      • Gift cards and special orders`,
    },
    {
      title: "Return Process",
      icon: RotateCcw,
      content: `To initiate a return:
      1. Contact our customer service within 14 days of delivery
      2. Provide your order number and reason for return
      3. Receive return authorization and shipping instructions
      4. Pack the furniture securely in original packaging if available
      5. Ship the item to our warehouse using provided label
      6. We'll inspect and process your return within 5-7 business days
      
      Email: bobbyfurnitures254@gmail.com | Phone: +254 708 156 310`,
    },
    {
      title: "Refunds",
      icon: DollarSign,
      content: `Refund Processing:
      - Refunds are issued once the returned item is received and inspected
      - Inspection typically takes 5-7 business days
      - Full refund minus original shipping cost will be issued
      - Refunds are credited to original payment method
      - Return shipping costs are non-refundable (unless return is due to our error)
      - Refund processing may take an additional 5-10 business days with your bank`,
    },
    {
      title: "Damaged Items Upon Arrival",
      content: `If furniture arrives damaged:
      - Report damage within 24 hours of delivery with photos
      - Do not refuse delivery; accept and document damage
      - Send us photos and order number via email
      - We'll either send a replacement or issue a full refund
      - Return shipping for damaged items is free`,
    },
    {
      title: "Defective Products",
      content: `If your furniture has manufacturing defects:
      - Report defects within 30 days of delivery
      - Provide photos and detailed description of the defect
      - We'll assess the issue and offer replacement or repair
      - Defective items can be returned free of charge
      - We may repair the item instead of replacing it (at our discretion)`,
    },
    {
      title: "Exchange Policy",
      content: `To exchange a product:
      - Contact us within 14 days of delivery
      - Original item must be in unused, original condition
      - Exchanges for the same item: free return shipping
      - Exchanges for different items: price difference may apply
      - Exchanges typically take 7-10 business days`,
    },
    {
      title: "Special Circumstances",
      content: `Late Returns:
      - Items returned after 14 days may not be eligible for return
      - Contact us to discuss possible exceptions
      
      Changed Mind Returns:
      - Full refund minus 15% restocking fee and return shipping
      - Item must be completely unused and in original condition
      
      We reserve the right to refuse returns that don't meet our conditions.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Return Policy</h1>
          <p className="text-lg text-gray-600">
            We want you to be completely satisfied with your purchase. Learn
            about our hassle-free return process.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: January 2025
          </p>
        </div>

        {/* Quick Return Summary */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">14-Day Return Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              We're confident you'll love your furniture. If you're not
              satisfied, return it within 14 days for a full refund (minus
              shipping costs). No questions asked.*
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {returnConditions.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-sm text-blue-600 mb-2">
                    {item.condition}
                  </p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              *Exceptions apply to custom orders and special items
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

        {/* Non-Returnable Items Highlight */}
        <Card className="border-amber-200 bg-amber-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600" />
              Important: Non-Returnable Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-3 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                How do I start a return?
              </h4>
              <p className="text-gray-600">
                Email us at bobbyfurnitures254@gmail.com with your order number
                and reason for return. We'll provide return authorization and
                shipping instructions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Do I have to pay for return shipping?
              </h4>
              <p className="text-gray-600">
                Return shipping is the customer's responsibility unless the
                return is due to damage upon delivery or a manufacturing defect.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                How long does a refund take?
              </h4>
              <p className="text-gray-600">
                Once we receive and inspect your return (5-7 days), we'll
                process your refund immediately. Your bank may take an
                additional 5-10 days to credit the amount.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Can I return an assembled item?
              </h4>
              <p className="text-gray-600">
                Items that have been assembled typically cannot be returned.
                However, if the item arrived damaged or defective, we will
                handle the return at no cost.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                What if I want to exchange my furniture?
              </h4>
              <p className="text-gray-600">
                Exchanges are available within 14 days for items in unused
                condition. Return shipping is free for same-item exchanges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Can I return custom-made furniture?
              </h4>
              <p className="text-gray-600">
                Custom-made and made-to-order furniture cannot be returned.
                These items are created specifically for you and are not
                returnable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReturnPolicy;
