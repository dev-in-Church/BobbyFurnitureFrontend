"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function ApiStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [apiStatus, setApiStatus] = useState("checking"); // checking, online, offline, error

  useEffect(() => {
    // Check browser online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check API health
    const checkApiHealth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/health`,
          {
            method: "GET",
            timeout: 5000,
          }
        );

        if (response.ok) {
          setApiStatus("online");
        } else {
          setApiStatus("error");
        }
      } catch (error) {
        setApiStatus("offline");
      }
    };

    // Initial check
    checkApiHealth();

    // Check every 30 seconds
    const interval = setInterval(checkApiHealth, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  // Don't show anything if everything is working
  if (isOnline && apiStatus === "online") {
    return null;
  }

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="h-4 w-4" />,
        message: "You're offline. Some features may not work properly.",
        variant: "destructive",
      };
    }

    switch (apiStatus) {
      case "checking":
        return {
          icon: <Wifi className="h-4 w-4 animate-pulse" />,
          message: "Checking connection...",
          variant: "default",
        };
      case "offline":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          message:
            "Unable to connect to our servers. Please check your internet connection.",
          variant: "destructive",
        };
      case "error":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          message:
            "Our servers are experiencing issues. Some features may be limited.",
          variant: "destructive",
        };
      default:
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          message: "Connected",
          variant: "default",
        };
    }
  };

  const { icon, message, variant } = getStatusInfo();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Alert variant={variant} className="shadow-lg">
        <div className="flex items-center">
          {icon}
          <AlertDescription className="ml-2">{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
