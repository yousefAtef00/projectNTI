import express from "express"
import { verifyToke } from "../../middleware/verifyToken.js"
import { checkout, getAllOrderForUser, getOrderById } from "./order.controller.js"

export const orderRoutes = express().router
orderRoutes.use(express.json())
orderRoutes.get("/orders",verifyToke,getAllOrderForUser)
orderRoutes.post("/cheakout",verifyToke,checkout)
orderRoutes.get("/orders/:id",verifyToke,getOrderById)