import express from "express";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();
productRouter.post("/addProduct", addProduct);
productRouter.post("/removeProduct", removeProduct);
productRouter.post("/singleProduct", singleProduct);
productRouter.get("/listProduct", listProduct);
export default productRouter;