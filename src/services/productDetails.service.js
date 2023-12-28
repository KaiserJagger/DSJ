// services/productDetails.service.js
import Product from '../dao/models/detail.model.js';


export const getProductDetailsService = async (productId) => {
  try {
    // Recupera el producto por su ID
    const productDetails = await Product.findById(productId);

    // Devuelve los detalles del producto
    return productDetails;
  } catch (error) {
    // Manejo de errores
    throw error;
  }
};