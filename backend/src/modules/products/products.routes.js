import express from "express";

import { verifyToke } from "../../middleware/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./products.controller.js";

export const productRoutes = express().router;

productRoutes.get("/products", getProducts);

productRoutes.post("/products", verifyToke, createProduct);
productRoutes.delete("/products/:id", verifyToke, deleteProduct);
productRoutes.put("/products/:id", verifyToke, updateProduct);
