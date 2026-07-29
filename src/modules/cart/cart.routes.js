import express from "express"
import { verifyToke } from "../../middleware/verifyToken.js"
import { addToCart, deleteProductInCart, getCart } from "./cart.controller.js"
export const cartRoutes=express().router
cartRoutes.use(express.json())
cartRoutes.get("/cart",verifyToke,getCart)
cartRoutes.post("/cart",verifyToke,addToCart)
cartRoutes.delete("/cart/:id",verifyToke,deleteProductInCart)