import React, { useState } from "react";
import api from "../api/axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/products", {
        name,
        price,
        description,
      });
      console.log("Product created:", response.data); // Handle success (e.g., redirect to product list)
      // Optionally, reset form fields
      setName("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error (e.g., no admin privileges)
    }
  };

  return (
    <div className="container mx-auto p-4 mt-36">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
