const mongoose = require("mongoose");

const popularProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);


module.exports = mongoose.model("popularproduct", popularProductSchema);
