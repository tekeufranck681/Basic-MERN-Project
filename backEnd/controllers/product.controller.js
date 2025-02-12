import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const postProduct = async (req, res) => {
    const product = req.body; //user will send this data
    if (!product.name || !product.price || !product.image) {
      res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error in Create Product:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      res.status(200).json({ success: true, data: deletedProduct ,message:"Product Deleted"});
    } catch (error) {
      console.error("Error in deleting product", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  export const getAllProducts = async (req, res) => {
    const allProducts = await Product.find();
    try {
      res.status(200).json({ succes: true, data: allProducts });
    } catch (error) {
      console.error("Error at loading all products: ", error.message);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  };

  export const updateProduct = async (req, res) => {
 
    try {
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
      }
      const product = await Product.findByIdAndUpdate(id, req.body);
      const updatedProduct = await Product.findById(id);
      res.status(200).json({ success: true, data: updatedProduct ,message:"Product Updated successfully"});
    } catch (error) {
      console.log("Error in updating Product:", error.message);
      res.status(404).json({ success: false, message: "Product not found" });
    }
  };