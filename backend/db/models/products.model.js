import mongoose, { model, Schema } from "mongoose";


const productSchema = new Schema({
     title: String,
    description: String,
    price: Number,
    image: String,
    stock: Number,
    
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
    versionKey:false
})

export const  productModel = model("Product", productSchema)