const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: [String], default: [] },
    compatibility: { type: String },
    availability: { type: String, default: 'In Stock' },
    imagePlaceholder: { type: String, default: '⚙️' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
