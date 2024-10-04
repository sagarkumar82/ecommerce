const { default: mongoose } = require("mongoose");
const Product = require("../model/productModel");

exports.addProduct = async (req, res) => {
  try {
    // Extract the product name from the request body and image from the file upload
    const { name } = req.body;
    const image = req.file;

    // Check if the image is provided
    if (!image) {
      return res.status(400).json({ error: "Product image is required" });
    }

    // Check if the name is provided
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Product name is required" });
    }

    const product = new Product({
      name,
      image: "/uploads/product" + "/" + image.filename,
    });

    const saveProduct = await product.save();

    res.status(200).json({
      message: "product saved successfuly",
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel server error",
      error,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("Invalid id");
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).send("Invalid id");
    }

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid Id",
      error,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();

    if (!product || product.length === 0) {
      return res.status(400).json({
        message: "No record found",
      });
    }

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file;
    const name = req.body.name;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }
    const previousDetail = await Product.findById(id);
    if (!previousDetail) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

    // save if its not file
    if (!image) {
      const ifNotFile = await Product.findByIdAndUpdate(
        id,
        {
          name,
          image: previousDetail.image,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Product updated successfuly!",
        data: ifNotFile,
      });
    }

    // save if its file
    if (image) {
      const isFile = await Product.findByIdAndUpdate(
        id,
        {
          name,
          image: "/uploads/product" + "/" + image.filename,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "product updated",
        data: isFile,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};
