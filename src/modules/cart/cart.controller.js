import jwt from "jsonwebtoken";
import { cartModel } from "../../../db/models/cart.model.js";
import { json } from "express";

async function getCart(req, res) {
  let userId = req.decoded._id;
  let cart = await cartModel.findOne({ user: userId }).populate("products.product");
  if (cart) {
    res.json({ message: "cart for user", cart });
  } else {
    res.json({ message: "no products in cart" });
  }
}
async function addToCart(req, res) {
  let userId = req.decoded._id;
  let cart = await cartModel.findOne({ user: userId });
  if (cart) {
    let existingProduct = cart.products.find(
      (p) => p.product.toString() === req.body.product,
    );
    if (req.body.quantity <= 0) {
    return res.json({
        message: "Quantity must be greater than 0"
    });
}
    if (existingProduct) {
      existingProduct.quantity += req.body.quantity;
    } else {
      cart.products.push({
        product: req.body.product,
        quantity: req.body.quantity,
      });
    }
    await cart.save();
  } else {
    cart = await cartModel.create({
      user: userId,
      products: [
        {
          product: req.body.product,
          quantity: req.body.quantity,
        },
      ],
    });
  }

  res.json({ message: "product added to cart", cart });
}
async function deleteProductInCart(req,res){
     let userId = req.decoded._id;
  let cart = await cartModel.findOne({ user: userId });
  if(cart){
     let existingProduct = cart.products.find(
      (p) => p.product.toString() === req.params.id,
    );
    if(existingProduct){
 cart.products = cart.products.filter(c => c.product.toString() !== req.params.id);
  await cart.save();
   res.json({ message: "product deleted " });}
   else{
 res.json({ message: "product not found in cart" });
   }}
  else{

 res.json({ message: "no products in cart" });
  }
  
}
export{
    addToCart,getCart,deleteProductInCart
}