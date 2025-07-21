"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
} from "lucide-react";

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Package,
      title: "Orders & Shipping",
      description: "Track orders, shipping info, and delivery details",
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      description: "Payment methods, billing, and refunds",
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      description: "Return policy, exchanges, and warranty",
    },
    {
      icon: Truck,
      title: "Delivery & Assembly",
      description: "Delivery options and furniture assembly",
    },
  ];

  const faqs = [
    {
      category: "Orders & Shipping",
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section. You'll also receive tracking information via email once your order ships.",
    },
    {
      category: "Orders & Shipping",
      question: "What are your shipping options?",
      answer:
        "We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and white-glove delivery for larger items. Free shipping is available on orders over $500.",
    },
    {
      category: "Payment & Billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and financing options through our partners.",
    },
    {
      category: "Payment & Billing",
      question: "Do you offer financing?",
      answer:
        "Yes! We offer 0% APR financing for qualified customers on purchases over $999. Apply at checkout to see your options.",
    },
    {
      category: "Returns & Exchanges",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Items must be in original condition with all packaging. Some restrictions apply to custom orders.",
    },
    {
      category: "Returns & Exchanges",
      question: "How do I return an item?",
      answer:
        "Contact our customer service team to initiate a return. We'll provide you with a return authorization number and shipping instructions.",
    },
    {
      category: "Delivery & Assembly",
      question: "Do you offer assembly services?",
      answer:
        "Yes! We offer professional assembly services for most furniture items. You can add this service during checkout or contact us after your purchase.",
    },
    {
      category: "Delivery & Assembly",
      question: "What is white-glove delivery?",
      answer:
        "White-glove delivery includes delivery to your room of choice, unpacking, assembly (if needed), and removal of packaging materials.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="h-8 w-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">+254 708 156 310</p>
              <Button variant="outline" size="sm">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="h-8 w-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Available 9 AM - 8 PM</p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="h-8 w-8 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">bobbyfurnitures254@gmail.com</p>
              <Button variant="outline" size="sm">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6 text-center">
                  <category.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="text-left">
                      <div className="font-medium">{faq.question}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {faq.category}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && searchQuery && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">
                  No results found for "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Still Need Help */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Our customer service team is
              here to help.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>Contact Support</Button>
              <Button variant="outline">Schedule a Call</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;
