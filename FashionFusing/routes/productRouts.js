import express from "express";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();
productRouter.post("/addProduct",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]) ,addProduct);
productRouter.post("/removeProduct", removeProduct);
productRouter.post("/singleProduct", singleProduct);
productRouter.get("/listProduct", listProduct);
export default productRouter;