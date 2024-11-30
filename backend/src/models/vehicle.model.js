const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['mini', 'sedan', 'suv', 'bike'],
    required: [true, 'Vehicle category is required'],
  },
  modelName: {
    type: String,
    required: [true, 'Model name is required'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Vehicle color is required'],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [7, 'Capacity cannot exceed 7'], // Assuming a maximum for most ride-sharing vehicles
  },
  rcNumber: {
    type: String,
    required: [true, 'RC (Registration Certificate) number is required'],
    unique: true,
    match: [/^[A-Za-z0-9-]{5,20}$/, 'Invalid RC number format'], // General format validation
  },
  insuranceNumber: {
    type: String,
    required: [true, 'Insurance number is required'],
    unique: true,
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    unique: true,
    match: [/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/, 'Invalid vehicle number format'], // Indian vehicle number format
  },
  vehicleFrontImage: {
    type: String,
    required: [true, 'Vehicle front image is required'],
    match: [/^https?:\/\/.+/, 'Vehicle front image must be a valid URL'],
  },
  vehicleBackImage: {
    type: String,
    required: [true, 'Vehicle back image is required'],
    match: [/^https?:\/\/.+/, 'Vehicle back image must be a valid URL'],
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
}, { timestamps: true });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
