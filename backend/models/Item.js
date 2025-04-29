const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  store: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
