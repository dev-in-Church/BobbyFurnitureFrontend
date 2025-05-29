"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Truck, Shield, Heart, Star } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Years in Business", value: "25+", icon: Award },
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Delivered", value: "100,000+", icon: Truck },
    { label: "Customer Satisfaction", value: "98%", icon: Star },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description:
        "Every piece of furniture is carefully selected and crafted to meet the highest standards of quality.",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "We've built our reputation on trust, reliability, and delivering on our promises for over 25 years.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and safe delivery to your doorstep, with white-glove service available for larger items.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Bobby Furniture
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over 25 years, we've been helping families create beautiful,
            comfortable homes with high-quality furniture at affordable prices.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Bobby Furniture was founded in 1999 with a simple mission: to
                make beautiful, high-quality furniture accessible to everyone.
                What started as a small family business has grown into one of
                the most trusted furniture retailers in the country.
              </p>
              <p>
                Our founder, Bobby Martinez, believed that everyone deserves to
                live in a space they love. This philosophy continues to drive us
                today as we carefully curate our collection to offer the perfect
                blend of style, comfort, and affordability.
              </p>
              <p>
                From our humble beginnings in a single showroom to our current
                network of locations and online presence, we've never lost sight
                of what matters most: helping our customers create homes they're
                proud of.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-24 w-24 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                Family Owned & Operated
              </h3>
              <p className="text-gray-600">
                Three generations of the Martinez family continue to lead Bobby
                Furniture with the same values and commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To provide exceptional furniture and home decor that combines
              style, quality, and affordability, while delivering an outstanding
              customer experience that makes furnishing your home a joy, not a
              chore.
            </p>
          </CardContent>
        </Card>

        {/* Commitment Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Our Commitment to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Quality Guarantee
              </Badge>
              <p className="text-gray-600">
                Every piece comes with our quality guarantee. If you're not
                satisfied, we'll make it right.
              </p>
            </div>
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Expert Service
              </Badge>
              <p className="text-gray-600">
                Our knowledgeable team is here to help you find the perfect
                pieces for your space and style.
              </p>
            </div>
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Sustainable Practices
              </Badge>
              <p className="text-gray-600">
                We're committed to sustainable practices and partnering with
                environmentally responsible manufacturers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
