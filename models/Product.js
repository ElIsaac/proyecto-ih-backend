const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
  name: String,
  descripcion: String,
  precio: Number,
  cantidad: Number,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
