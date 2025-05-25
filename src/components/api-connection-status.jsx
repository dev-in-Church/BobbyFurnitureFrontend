"use client";

import { useState, useEffect } from "react";
import { checkApiHealth } from "../lib/api-production";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

export default function ApiConnectionStatus() {
  const [status, setStatus] = useState({
    status: "checking",
    message: "Checking connection...",
  });
  const [isVisible, setIsVisible] = useState(true);

  const checkConnection = async () => {
    try {
      const health = await checkApiHealth();
      setStatus(health);

      // Auto-hide if connection is good
      if (health.status === "online") {
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      setStatus({
        status: "offline",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (!isVisible && status.status === "online") {
    return null;
  }

  const getStatusColor = () => {
    switch (status.status) {
      case "online":
        return "bg-green-50 border-green-200 text-green-800";
      case "offline":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case "online":
        return <Wifi className="h-4 w-4" />;
      case "offline":
        return <WifiOff className="h-4 w-4" />;
      default:
        return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
  };

  return (
    <div className={`border rounded-md p-3 mx-4 mb-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-2">{getStatusIcon()}</div>
          <div>
            <p className="text-sm font-medium">
              {status.status === "online" &&
                "✅ Connected to Bobby Furniture API"}
              {status.status === "offline" && "❌ Unable to connect to API"}
              {status.status === "checking" && "🔄 Checking API connection..."}
            </p>
            {status.message && <p className="text-xs mt-1">{status.message}</p>}
            {status.error && (
              <p className="text-xs mt-1">Error: {status.error}</p>
            )}
            {status.productsCount !== undefined && (
              <p className="text-xs mt-1">
                Products available: {status.productsCount}
              </p>
            )}
          </div>
        </div>
        {status.status === "offline" && (
          <button
            onClick={checkConnection}
            className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 rounded transition-colors"
          >
            Retry
          </button>
        )}
        {status.status === "online" && (
          <button
            onClick={() => setIsVisible(false)}
            className="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 rounded transition-colors"
          >
            Hide
          </button>
        )}
      </div>
    </div>
  );
}
