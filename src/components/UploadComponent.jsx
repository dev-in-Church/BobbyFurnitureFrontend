"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import {
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineFile,
  AiOutlineDelete,
} from "react-icons/ai";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    // Check if file is an image
    if (!selectedFile.type.match("image.*")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadedImageUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      const { data: signatureData } = await axios.get(
        `${API_BASE_URL}/api/generate-signature`
      );

      const formData = new FormData();
      formData.append("image", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);

      const { data: uploadResponse } = await axios.post(
        `${API_BASE_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedImageUrl(uploadResponse.imageUrl);
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Upload failed. Please try again.");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-10">
      <div className="p-8 rounded-2xl shadow-xl mx-auto mt-8 bg-white flex flex-col items-center w-full max-w-md border border-gray-100 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <AiOutlineCloudUpload className="mr-2 text-indigo-600" size={24} />
          Upload an Image
        </h2>

        <div
          className={`w-full mb-6 relative ${
            dragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 bg-gray-50"
          } border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept="image/*"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-full w-full"
          >
            {!preview ? (
              <>
                <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                  <AiOutlineCloudUpload size={28} className="text-indigo-600" />
                </div>
                <p className="text-center text-gray-600 mb-2">
                  Drag and drop your image here or click to browse
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Supports: JPG, PNG, GIF (Max 5MB)
                </p>
              </>
            ) : (
              <div className="relative w-full">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
                >
                  <AiOutlineDelete className="text-red-500" size={18} />
                </button>
              </div>
            )}
          </label>
        </div>

        {file && !uploadedImageUrl && (
          <div className="w-full mb-4 flex items-center bg-gray-50 p-3 rounded-lg">
            <AiOutlineFile className="text-indigo-600 mr-2" size={20} />
            <div className="flex-1 truncate text-sm text-gray-700">
              {file.name}
            </div>
            <div className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        )}

        {error && (
          <div className="w-full mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fadeIn">
            <p className="text-red-700 text-sm flex items-center">
              <AiOutlineCloseCircle size={18} className="mr-2" /> {error}
            </p>
          </div>
        )}

        {uploading && (
          <div className="w-full mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading || !file || uploadedImageUrl}
          className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg w-full font-medium transition-all duration-300 ${
            uploading || !file || uploadedImageUrl
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {uploading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" size={18} />
              <span>Uploading...</span>
            </>
          ) : uploadedImageUrl ? (
            <>
              <AiOutlineCheckCircle size={18} />
              <span>Uploaded</span>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload size={18} />
              <span>Upload Image</span>
            </>
          )}
        </button>

        {uploadedImageUrl && (
          <div className="mt-6 w-full text-center animate-fadeIn">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <p className="text-green-700 flex items-center justify-center gap-2 font-medium mb-2">
                <AiOutlineCheckCircle size={20} /> Upload Successful!
              </p>
              <p className="text-xs text-gray-600 mb-2">
                Your image is now available at:
              </p>
              <div className="bg-white p-2 rounded border border-gray-200 text-xs text-gray-800 break-all">
                {uploadedImageUrl}
              </div>
            </div>

            <div className="relative">
              <img
                src={uploadedImageUrl || "/placeholder.svg"}
                alt="Uploaded"
                className="w-full h-48 object-contain rounded-lg border border-gray-200 shadow-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 hover:opacity-100 bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium shadow-md transition-all duration-300"
                >
                  View Full Size
                </a>
              </div>
            </div>

            <button
              onClick={clearFile}
              className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              <AiOutlineDelete size={16} />
              Upload another image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
