import productModel from "../../../dao/models/product.model.js";
import logger from "../../../utils/logger.js";

export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updatedData = req.body;


  try {
    
    if(updatedData.stock <= 0) {
      return res.status(404).render('errors/update-stock-error');
    }

    if (updatedData.stock <= 0) {
      return res.status(404).render("errors/update-price-error");
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    
    res.redirect(`/api/products/manager`);
  } catch (err) {
    logger.error(`Error updating product:
      ${err.stack}`);
    res.status(500).send("Error updating product");
  }
};
