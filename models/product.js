const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [{ type: String }],
    seller: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
