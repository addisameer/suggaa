const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  dob: {
    type: Date,
    validate: {
      validator: function (value) {
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 18; // Drivers must be at least 18 years old
      },
      message: 'Driver must be at least 18 years old',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  profilePicture: {
    type: String,
    required: [true, 'Profile picture is required'],
    },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true,
  },
  licenseImage: {
    type: String,
    required: [true, 'License image is required'],
  },
  panNumber: {
    type: String,
    unique: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN number format'],
  },
  panCardImage: {
    type: String,
    required: [true, 'PAN card image is required'],
    match: [/^https?:\/\/.+/, 'PAN card image must be a valid URL'],
  },
  address: {
    fullAddress: {
      type: String,
      required: [true, 'Full address is required'],
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^\d{6}$/, 'Pincode must be a 6-digit number'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
  },
  aadhaarCardImage: {
    type: String,
    required: [true, 'Aadhaar card image is required'],
    match: [/^https?:\/\/.+/, 'Aadhaar card image must be a valid URL'],
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
  },
 BankDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Driver = mongoose.model('Driver', driverSchema);
