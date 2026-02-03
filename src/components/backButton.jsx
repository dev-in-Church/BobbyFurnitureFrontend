import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back if possible
    } else {
      navigate("/"); // Fallback to home
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-center p-2 text-gray-600 hover:text-primary"
      aria-label="Go Back"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
