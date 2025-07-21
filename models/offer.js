const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  offerID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bankName: String,
  minAmount: Number,
  maxDiscount: Number,
  discountType: { type: String, enum: ['FLAT', 'PERCENTAGE'] },
  discountValue: Number,
  paymentInstruments: [String]
});

module.exports = mongoose.model('Offer', offerSchema);