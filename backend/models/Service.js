const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '⚙️' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['core', 'expertise'], default: 'core' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
