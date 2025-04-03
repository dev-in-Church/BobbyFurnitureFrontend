"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Here you would typically send the email to your newsletter service
    console.log("Subscribing email:", email);

    // Show success state
    setSubmitted(true);
    setError("");

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-primary text-white py-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Stay updated with our latest collections, exclusive offers, and
            interior design tips. Subscribe now and get 10% off your first
            order!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-grow relative">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              />
              {error && (
                <p className="absolute -bottom-6 left-0 text-xs text-red-300">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className={`h-12 px-6 ${
                submitted
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <Check className="h-5 w-5 mr-1" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/60 mt-6">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </p>
        </div>
      </div>
    </div>
  );
}
