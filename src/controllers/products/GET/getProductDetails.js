// Importa mongoose para poder utilizar sus funciones
import mongoose from "mongoose";
import Product from "../../../dao/models/productDetail.model.js";

export const getProductDetail = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).render("errors/404");
    }

    res.render("productDetail", { product: product.toObject() });
  } catch (error) {
    console.error("Error obteniendo detalle del producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};
