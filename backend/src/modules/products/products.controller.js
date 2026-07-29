
import jwt from "jsonwebtoken"
import { productModel } from "../../../db/models/products.model.js"

 async function createProduct(req,res){
    req.body.createdBy = req.decoded._id
    let addedProduct =await productModel.insertMany(req.body)
    res.json({message:"product added successfully", addedProduct})
 }

  async function getProducts(req,res) {
    
    let Products = await productModel.find().populate("createdBy")
    res.json({message:"all Products",Products})
   
 }
async function deleteProduct(req, res) {
    let deletedProduct = await productModel.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.decoded._id
    });

    if (deletedProduct) {
        res.json({
            message: "Product deleted successfully",
            deletedProduct
        });
    } else {
        res.json({
            message: "Product not found or unauthorized"
        });
    }
}
async function updateProduct(req,res) {
     let updatedProduct = await productModel.findOneAndUpdate({
        _id: req.params.id,
        createdBy: req.decoded._id
    },{...req.body},{new:true});

      if (updatedProduct) {
        res.json({
            message: "Product updated successfully",
            updatedProduct
        });
    } else {
        res.json({
            message: "Product not found or unauthorized"
        });
    }
}

 export{
    createProduct,
    getProducts,deleteProduct
    ,updateProduct
 }