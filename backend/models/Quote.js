const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email address'],
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: [true, 'Please select a service type'],
      enum: ['Spare Parts', 'Electronic Servicing', 'HMI Conversion', 'Automation Support', 'Other'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Closed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
