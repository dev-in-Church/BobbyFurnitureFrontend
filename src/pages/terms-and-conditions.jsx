import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, FileText, CheckCircle, XCircle } from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Agreement to Terms",
      icon: FileText,
      content: `By accessing and using Bobby Furniture's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      title: "Use License",
      icon: CheckCircle,
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Bobby Furniture's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      - Modifying or copying the materials
      - Using the materials for any commercial purpose or for any public display
      - Attempting to decompile or reverse engineer any software on the website
      - Removing any copyright or other proprietary notations from the materials
      - Transferring the materials to another person or "mirroring" the materials on any other server`,
    },
    {
      title: "Disclaimer",
      icon: AlertCircle,
      content: `The materials on Bobby Furniture's website are provided on an 'as is' basis. Bobby Furniture makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      title: "Limitations",
      content: `In no event shall Bobby Furniture or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bobby Furniture's website, even if Bobby Furniture or an authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      title: "Accuracy of Materials",
      content: `The materials appearing on Bobby Furniture's website could include technical, typographical, or photographic errors. Bobby Furniture does not warrant that any of the materials on its website are accurate, complete, or current. Bobby Furniture may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      title: "Materials & Product Information",
      content: `The materials on Bobby Furniture's website are provided for informational purposes only. Bobby Furniture does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website, or otherwise relating to such materials or on any sites linked to this website.`,
    },
    {
      title: "Limitations on Liability",
      icon: XCircle,
      content: `In no case shall Bobby Furniture, its suppliers, or any third parties mentioned on this website be liable for any damages whatsoever (including, without limitation, incidental and consequential damages, lost profits, or damages resulting from lost data or business interruption) resulting from the use or inability to use the materials on Bobby Furniture's website.`,
    },
    {
      title: "Accuracy of Orders",
      content: `We strive to provide accurate product descriptions, pricing, and availability on our website. However, we do not warrant that product descriptions, pricing, or other content on our website is accurate, complete, reliable, current, or error-free. If a product offered is not as described, your sole remedy is to return it in unused condition.`,
    },
    {
      title: "Modifications",
      content: `Bobby Furniture may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.`,
    },
    {
      title: "Governing Law",
      content: `These conditions and terms are governed by and construed in accordance with the laws of Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts located in Nairobi, Kenya.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Please read these terms and conditions carefully before using our
            website.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: January 2025
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 mr-3 text-blue-600" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              These website standard terms and conditions written on this
              webpage shall manage your use of our website, Bobby Furniture.
              These terms will be applied fully and affect your use of this
              website. By using this website, you agree that you have read and
              accepted these terms and conditions.
            </p>
          </CardContent>
        </Card>

        {/* Terms Sections */}
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

        {/* Footer Note */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-gray-700">
              If you have any questions about these Terms & Conditions, please
              contact us at{" "}
              <a
                href="mailto:bobbyfurnitures254@gmail.com"
                className="text-blue-600 hover:underline"
              >
                bobbyfurnitures254@gmail.com
              </a>{" "}
              or call +254 708 156 310.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
