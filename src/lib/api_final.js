export async function uploadProductImages(files) {
  const formData = new FormData();

  files.forEach((file) => formData.append("images", file));

  const response = await fetch(
    `${import.meta.env.VITE_API_URL || ""}/api/products/upload/images`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Image upload failed");
  }

  return data.urls || data.images.map((image) => image.url);
}
