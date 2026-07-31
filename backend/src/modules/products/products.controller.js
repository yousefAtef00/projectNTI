import jwt from "jsonwebtoken"
import { productModel } from "../../../db/models/products.model.js"

async function createProduct(req, res) {
  try {
    req.body.createdBy = req.decoded._id;
    let addedProduct = await productModel.insertMany(req.body);
    res.status(201).json({ message: "product added successfully", addedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function getProducts(req, res) {
  try {
    let Products = await productModel.find().populate("createdBy");
    res.json({ message: "all Products", Products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
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
      res.status(404).json({
        message: "Product not found or unauthorized"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    let updatedProduct = await productModel.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.decoded._id
      },
      { ...req.body },
      { new: true }
    );

    if (updatedProduct) {
      res.json({
        message: "Product updated successfully",
        updatedProduct
      });
    } else {
      res.status(404).json({
        message: "Product not found or unauthorized"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

export {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
}