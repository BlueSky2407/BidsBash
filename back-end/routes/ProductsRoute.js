const router = require("express").Router();
const Products = require("../models/productModel.js");
const auth = require("../middleware/auth.js");

router.post("/add-product", auth, async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added successfully",
      // data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get products
router.get("/get-products", auth, async (req, res) => {
  try {
    const products = await Products.find();
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
