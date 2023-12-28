// Ejemplo de cómo podría ser el modelo Product
// dao/models/productDetail.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  stock: Number,
  price: Number,
  owner: String,
  thumbnails: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
