const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    startLocation: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    endLocation: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    driverLocation: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    otp : {
      type : String ,
      required : true,
    },
    fare: {
      type: Number,
      required: [true, 'Fare is required'],
      min: [0, 'Fare must be a positive number'],
    },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed', 'canceled'],
      default: 'pending',
    },
    bookedAt: {
      type: Date,
    },
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
  }, { timestamps: true });
  
  export const Ride = mongoose.model('Ride', rideSchema);

  