"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { checkApiHealth } from "../lib/api-with-fallback";

export default function ApiStatusBanner() {
  const [apiStatus, setApiStatus] = useState({ status: "checking" });
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkApiHealth();
        setApiStatus(status);
      } catch (error) {
        setApiStatus({ status: "offline", error: error.message });
      }
    };

    checkStatus();

    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!showBanner || apiStatus.status === "online") {
    return null;
  }

  const getStatusConfig = () => {
    switch (apiStatus.status) {
      case "checking":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          iconColor: "text-yellow-400",
          message: "Checking API connection...",
        };
      case "offline":
        return {
          icon: XCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          iconColor: "text-red-400",
          message: "API is currently offline. Using cached data.",
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          iconColor: "text-green-400",
          message: "API is online and working normally.",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border rounded-md p-4 mb-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${config.textColor}`}>{config.message}</p>
          {apiStatus.status === "offline" && (
            <p className={`text-xs ${config.textColor} mt-1 opacity-75`}>
              Products are being loaded from local cache. Some features may be
              limited.
            </p>
          )}
        </div>
        <div className="ml-3">
          <button
            onClick={() => setShowBanner(false)}
            className={`${config.textColor} hover:opacity-75`}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
