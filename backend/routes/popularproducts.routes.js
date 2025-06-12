const express = require('express');
const router = express.Router();
const popularproduct = require('../models/popularproducts.model'); 

router.get('/', async (req, res) => {
  try {
    const products = await popularproduct.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new popular product
router.post('/popularproducts', async (req, res) => {
  console.log("did we hit the popular posting products")
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const product = new popularproduct({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    await product.save();  
    res.status(201).json({ product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding popular product" });
  }
});

module.exports = router;