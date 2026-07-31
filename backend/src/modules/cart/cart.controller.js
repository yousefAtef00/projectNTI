import jwt from "jsonwebtoken";
import { cartModel } from "../../../db/models/cart.model.js";

async function getCart(req, res) {
  try {
    let userId = req.decoded._id;
    let cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");
    if (cart) {
      res.json({ message: "cart for user", cart });
    } else {
      res.json({ message: "no products in cart" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
}

async function addToCart(req, res) {
  try {
    let userId = req.decoded._id;

    if (req.body.quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    let cart = await cartModel.findOne({ user: userId });
    if (cart) {
      let existingProduct = cart.products.find(
        (p) => p.product.toString() === req.body.product,
      );

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
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
}

async function deleteProductInCart(req, res) {
  try {
    let userId = req.decoded._id;
    let cart = await cartModel.findOne({ user: userId });

    if (cart) {
      let existingProduct = cart.products.find(
        (p) => p.product.toString() === req.params.id,
      );

      if (existingProduct) {
        cart.products = cart.products.filter(
          (c) => c.product.toString() !== req.params.id,
        );
        await cart.save();
        res.json({ message: "product deleted" });
      } else {
        res.status(404).json({ message: "product not found in cart" });
      }
    } else {
      res.json({ message: "no products in cart" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
}
async function updateCartQuantity(req, res) {
  try {
    let userId = req.decoded._id;
    let { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "cart not found",
      });
    }

    let existingProduct = cart.products.find(
      (p) => p.product.toString() === req.params.id,
    );

    if (!existingProduct) {
      return res.status(404).json({
        message: "product not found in cart",
      });
    }
    if (quantity > existingProduct.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`,
      });
    }
    existingProduct.quantity = quantity;

    await cart.save();

    res.json({
      message: "quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
}

export { addToCart, getCart, deleteProductInCart, updateCartQuantity };
