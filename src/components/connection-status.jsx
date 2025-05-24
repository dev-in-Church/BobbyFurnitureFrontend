"use client";

import { useState, useEffect } from "react";
import { WifiOff, Server, AlertTriangle, CheckCircle } from "lucide-react";
import { checkApiHealth } from "../lib/api-final";

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [apiStatus, setApiStatus] = useState("checking");
  const [lastChecked, setLastChecked] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Check internet connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Check API health
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await checkApiHealth();
        setApiStatus(health.status === "online" ? "online" : "offline");
        setLastChecked(new Date());
      } catch (error) {
        setApiStatus("offline");
        setLastChecked(new Date());
      }
    };

    // Initial check
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!isOnline) return "bg-red-500";
    if (apiStatus === "online") return "bg-green-500";
    if (apiStatus === "offline") return "bg-red-500";
    return "bg-yellow-500";
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />;
    if (apiStatus === "online") return <CheckCircle className="h-4 w-4" />;
    if (apiStatus === "offline") return <Server className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (!isOnline) return "No Internet";
    if (apiStatus === "online") return "Connected";
    if (apiStatus === "offline") return "API Offline";
    return "Checking...";
  };

  // Only show if there's an issue or in development
  const shouldShow =
    !isOnline ||
    apiStatus === "offline" ||
    process.env.NODE_ENV === "development";

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${getStatusColor()} text-white px-3 py-2 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>

        {showDetails && (
          <div className="mt-2 text-xs bg-black/20 rounded p-2">
            <div>Internet: {isOnline ? "Connected" : "Disconnected"}</div>
            <div>API: {apiStatus}</div>
            {lastChecked && (
              <div>Last checked: {lastChecked.toLocaleTimeString()}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
