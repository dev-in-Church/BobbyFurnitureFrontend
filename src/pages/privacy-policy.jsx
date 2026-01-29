import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Shield, Mail, Eye, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: `We collect information you provide directly to us, including:
      - Personal identification information (name, email, phone number, address)
      - Purchase history and order details
      - Payment information (processed securely through our payment provider)
      - Communication preferences and customer service interactions
      - Browser and device information for website optimization`,
    },
    {
      title: "How We Use Your Information",
      icon: Lock,
      content: `Your information is used to:
      - Process and fulfill your orders
      - Communicate with you about your purchases and account
      - Send promotional emails and newsletters (with your consent)
      - Improve our website and customer service
      - Prevent fraud and ensure security
      - Comply with legal obligations`,
    },
    {
      title: "Data Protection & Security",
      icon: Shield,
      content: `We implement industry-standard security measures to protect your personal data:
      - SSL encryption for all data transmission
      - Secure payment processing through certified providers
      - Regular security audits and updates
      - Limited access to personal information by authorized personnel only
      - No sharing of personal data with third parties without your consent`,
    },
    {
      title: "Cookies & Tracking",
      content: `Our website uses cookies to:
      - Remember your preferences and login information
      - Analyze website usage and user behavior
      - Improve website functionality and user experience
      - Display personalized content and advertisements
      - You can disable cookies in your browser settings at any time`,
    },
    {
      title: "Third-Party Links",
      content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review their privacy policies before providing any personal information.`,
    },
    {
      title: "Your Rights",
      content: `You have the right to:
      - Access your personal data
      - Request correction of inaccurate information
      - Request deletion of your data (subject to legal requirements)
      - Opt-out of promotional communications
      - File a complaint with relevant data protection authorities`,
    },
    {
      title: "Policy Updates",
      content: `We may update this privacy policy periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes via email or by posting a notice on our website. Your continued use of our website after updates constitutes acceptance of the revised policy.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            We respect your privacy and are committed to protecting your
            personal data. This policy outlines how we collect, use, and protect
            your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: January 2025
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-600" />
              Your Privacy Matters to Us
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              Bobby Furniture is committed to maintaining the confidentiality
              and integrity of your personal information. This Privacy Policy
              explains our practices regarding data collection, use, and
              protection. By using our website and services, you consent to the
              practices described in this policy.
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

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-blue-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              If you have questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:bobbyfurnitures254@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  bobbyfurnitures254@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +254 708 156 310
              </p>
              <p>
                <strong>Address:</strong> Kahawa Sukari, Nairobi, Kenya
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
