import { useState } from "react";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/solid";

const UploadComponent = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError(null); // Reset error if new file is selected
    }
  };

  const getSignature = async () => {
    try {
      const response = await fetch(
        "https://bobbyfurnitureonline.onrender.com/api/generate-signature"
      );
      if (!response.ok) throw new Error("Failed to fetch signature");
      return await response.json();
    } catch (err) {
      setError("Error fetching signature. Please try again.");
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const signatureData = await getSignature();
    if (!signatureData) {
      setLoading(false);
      return;
    }

    const { timestamp, signature, cloudName, apiKey } = signatureData;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("cloud_name", "cloudName");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        setError("Upload failed. Please try again.");
        console.error("Upload error:", data);
      }
    } catch (err) {
      setError("Upload failed. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 mt-24 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-700">Upload Image</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />

      {image && (
        <div className="flex items-center gap-2 text-gray-600">
          <p className="text-sm truncate max-w-[200px]">{image.name}</p>
          <button onClick={() => setImage(null)} className="text-red-500">
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-5 py-2 flex items-center gap-2 text-white rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        <CloudArrowUpIcon className="w-5 h-5" />
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-gray-600 text-sm">Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-64 h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
