
import { cartModel } from "../../../db/models/cart.model.js";
import { orderModel } from "../../../db/models/order.model.js";

import jwt from "jsonwebtoken"
async function checkout(req,res) {
    let userId=req.decoded._id
    let cart=await cartModel.findOne({user:userId}).populate("products.product");
    if(cart &&cart.products.length>0){
     let totalPrice= cart.products.reduce((sum,products)=>sum+=(products.product.price*products.quantity),0)
      let order =await orderModel.create({user:userId,products:cart.products,totalPrice:totalPrice})
      cart.products = [];
    await cart.save();
     res.json({message:"order added sucessfully",order})
    }
    else{
        res.json({message:"cart is empty"})
    }
}
async function getAllOrderForUser(req,res) {
    let userId=req.decoded._id
     let orders=await orderModel.find({user: userId}).populate("products.product");
     res.json({message:"all orders",orders})
}
async function getOrderById(req,res) {
    let userId=req.decoded._id
  let order = await orderModel.findOne({_id: req.params.id,user: userId}).populate("products.product");
  if(order){
     res.json({message:"order",order})}
     else{
        res.json({message:"order not found"})}
     }

export{
    checkout,getOrderById,getAllOrderForUser

}