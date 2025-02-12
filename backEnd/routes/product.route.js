import express from "express";
import { deleteProduct, getAllProducts, postProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", postProduct);

router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);

router.put("/:id", updateProduct);


export default router;