import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
});
export const orderModel=model("order",orderSchema)