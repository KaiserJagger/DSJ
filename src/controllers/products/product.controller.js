import { getProducts } from "./GET/getProducts.js";
import { getMocking } from "./GET/getMocking.js";
import { createProduct } from "./POST/createProduct.js";
import { getProductDetail } from "./GET/getProductDetails.js";


export const productController = {
  getProducts,
  createProduct,
  getMocking,
  getProductDetail,
};
