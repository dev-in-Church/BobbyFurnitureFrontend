// import { useState } from "react";
// import axios from "axios";
// import {
//   AiOutlineCloudUpload,
//   AiOutlineCheckCircle,
//   AiOutlineCloseCircle,
// } from "react-icons/ai";

// const UploadComponent = () => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     try {
//       const { data: signatureData } = await axios.get(
//         `${API_BASE_URL}/api/generate-signature`
//       );

//       const formData = new FormData();
//       formData.append("image", file);
//       formData.append("api_key", signatureData.apiKey);
//       formData.append("timestamp", signatureData.timestamp);
//       formData.append("signature", signatureData.signature);
//       formData.append("folder", signatureData.folder);

//       const { data: uploadResponse } = await axios.post(
//         `${API_BASE_URL}/api/upload`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setUploadedImageUrl(uploadResponse.imageUrl);
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setError("Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 border rounded-lg shadow-lg w-96 mx-auto bg-white">
//       <h2 className="text-lg font-semibold mb-3 text-gray-700">
//         Upload an Image
//       </h2>

//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="mb-3 block w-full border rounded-md p-2 cursor-pointer"
//       />

//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//           className="w-full h-40 object-cover mb-3 rounded-md border"
//         />
//       )}

//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition-all ${
//           uploading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {uploading ? "Uploading..." : "Upload"}
//         <AiOutlineCloudUpload size={20} />
//       </button>

//       {uploadedImageUrl && (
//         <div className="mt-4 text-center">
//           <p className="text-green-600 flex items-center justify-center gap-2">
//             <AiOutlineCheckCircle size={20} /> Upload Successful!
//           </p>
//           <img
//             src={uploadedImageUrl}
//             alt="Uploaded"
//             className="w-full h-40 object-cover rounded-md mt-2 border"
//           />
//         </div>
//       )}

//       {error && (
//         <p className="text-red-600 mt-3 flex items-center justify-center gap-2">
//           <AiOutlineCloseCircle size={20} /> {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default UploadComponent;

import { useState } from "react";
import axios from "axios";
import {
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
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
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadedImageUrl(uploadResponse.imageUrl);
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4">
      <div className="p-6 border rounded-lg shadow-lg mx-2 mt-24 bg-white flex flex-col just items-center overflow-hidden w-[100%] sm:w-[500px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload an Image
        </h2>

        <label className="w-full cursor-pointer mb-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-all">
          <AiOutlineCloudUpload size={30} className="text-gray-600 mb-2" />
          <span className="text-gray-600 text-sm">Click to select a file</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover mb-3 rounded-md border"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition-all ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
          <AiOutlineCloudUpload size={20} />
        </button>

        {uploadedImageUrl && (
          <div className="mt-4 text-center">
            <p className="text-green-600 flex items-center justify-center gap-2 font-medium">
              <AiOutlineCheckCircle size={20} /> Upload Successful!
            </p>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="w-full h-40 object-cover rounded-md mt-2 border shadow-md"
            />
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-3 flex items-center justify-center gap-2 font-medium">
            <AiOutlineCloseCircle size={20} /> {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
