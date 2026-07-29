import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
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
            quantity: Number
        }
    ]
}, {
    timestamps: true,
    versionKey:false
});
export const cartModel=model("cart",cartSchema)