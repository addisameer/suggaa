const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
    unique: true,
    match: [/^\d{9,18}$/, 'Account number must be between 9 and 18 digits'],
  },
  accountHolderName: {
    type: String,
    required: [true, 'Account holder name is required'],
    trim: true,
  },
  ifscCode: {
    type: String,
    required: [true, 'IFSC code is required'],
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format'],
  },
  bankName: {
    type: String,
    required: [true, 'Bank name is required'],
    trim: true,
  },
  firstPage: {
    type: String,
    required: [true, 'First page of the bank document is required'],
    match: [/^https?:\/\/.+/, 'First page must be a valid URL'],
  },
  // Optional: Link to the user (Driver/Rider) if applicable
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with the appropriate model name (e.g., 'Driver', 'Rider')
  },
}, { timestamps: true });

export const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

