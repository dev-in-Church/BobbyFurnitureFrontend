"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  RefreshCw,
  Shield,
  User,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const TokenManager = ({ onTokenUpdate }) => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [tokenStatus, setTokenStatus] = useState("unknown");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

  // Parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // Verify token with backend
  const verifyToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setTokenStatus("missing");
      setTokenInfo(null);
      setLoading(false);
      return;
    }

    try {
      // Parse token locally first
      const localParsed = parseJwt(token);

      // Check if token is expired
      if (localParsed && localParsed.exp) {
        const now = Math.floor(Date.now() / 1000);
        if (localParsed.exp < now) {
          setTokenStatus("expired");
          setTokenInfo(localParsed);
          setLoading(false);
          return;
        }
      }

      // Verify with backend
      const response = await fetch(`${API_BASE_URL}/users/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTokenStatus("valid");
        setTokenInfo(data.user);
        onTokenUpdate?.(data.user);
        toast.success("Token is valid!");
      } else {
        setTokenStatus("invalid");
        setTokenInfo(localParsed);
        toast.error("Token is invalid");
      }
    } catch (error) {
      setTokenStatus("error");
      setTokenInfo(parseJwt(token));
      toast.error(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Copy token to clipboard
  const copyToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigator.clipboard.writeText(token);
      toast.success("Token copied to clipboard");
    } else {
      toast.error("No token found");
    }
  };

  // Clear token
  const clearToken = () => {
    localStorage.removeItem("token");
    setTokenInfo(null);
    setTokenStatus("missing");
    toast.info("Token cleared");
    onTokenUpdate?.(null);
  };

  // Format expiry time
  const formatExpiry = (exp) => {
    if (!exp) return "Unknown";
    const date = new Date(exp * 1000);
    const now = new Date();
    const diff = date - now;

    if (diff < 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""}`;
    }

    return `${hours}h ${minutes}m`;
  };

  // Get status color and icon
  const getStatusDisplay = () => {
    switch (tokenStatus) {
      case "valid":
        return { color: "bg-green-500", icon: CheckCircle, text: "Valid" };
      case "invalid":
        return { color: "bg-red-500", icon: XCircle, text: "Invalid" };
      case "expired":
        return { color: "bg-orange-500", icon: Clock, text: "Expired" };
      case "missing":
        return { color: "bg-gray-500", icon: XCircle, text: "Missing" };
      default:
        return { color: "bg-gray-400", icon: RefreshCw, text: "Unknown" };
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Token Manager
        </CardTitle>
        <CardDescription>
          Manage and verify your authentication token
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`${statusDisplay.color} text-white`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusDisplay.text}
            </Badge>
            <span className="text-sm text-gray-600">Token Status</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={verifyToken}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>

        {/* Token Information */}
        {tokenInfo && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">User ID:</span>
                <p>{tokenInfo.id || tokenInfo.userId || "Unknown"}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p>{tokenInfo.email || "Not provided"}</p>
              </div>
              <div>
                <span className="font-medium">Role:</span>
                <p className="flex items-center gap-1">
                  {tokenInfo.role || (tokenInfo.isAdmin ? "admin" : "user")}
                  {(tokenInfo.isAdmin || tokenInfo.role === "admin") && (
                    <Shield className="h-3 w-3 text-blue-600" />
                  )}
                </p>
              </div>
              <div>
                <span className="font-medium">Expires:</span>
                <p>{formatExpiry(tokenInfo.exp)}</p>
              </div>
            </div>

            {tokenInfo.exp && (
              <div className="text-xs text-gray-500">
                Full expiry: {new Date(tokenInfo.exp * 1000).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Token Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyToken}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Token
          </Button>
          <Button variant="outline" size="sm" onClick={clearToken}>
            <XCircle className="h-4 w-4 mr-2" />
            Clear Token
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/login")}
          >
            <User className="h-4 w-4 mr-2" />
            Login Page
          </Button>
        </div>

        {/* Warnings */}
        {tokenStatus === "expired" && (
          <Alert variant="destructive">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your token has expired. Please log in again to continue using the
              application.
            </AlertDescription>
          </Alert>
        )}

        {tokenStatus === "invalid" && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Your token is invalid or corrupted. Please clear it and log in
              again.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenManager;
