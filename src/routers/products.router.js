// products.router.js
import { Router } from "express";
import { productController } from "../controllers/products/product.controller.js";
import { productManager } from "../controllers/manager/product.manager.controller.js";
import logger from "../utils/logger.js";
import { isPremium } from "../middleware/premium.middleware.js";

const router = Router();

// Rutas estáticas
router.get("/create", isPremium, async (req, res) => {
  logger.http("GET /create");
  res.render("create");
});

router.get("/mockingproducts", productController.getMocking);

// Ruta dinámica para el detalle del producto
router.get("/:productId", productController.getProductDetail);
// Otras rutas
router.get('/update-product/:productId', productManager.getProductsManager);
router.get("/:manager?", productController.getProducts);
router.post('/update-products/:productId', productManager.updateProduct);
router.post("/", productController.createProduct);
router.post("/delete-product", productManager.deleteProduct);


export default router;
