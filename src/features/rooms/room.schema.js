import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
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

  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{5}(-\d{4})?$/, "Please fill a valid ZIP code"],
    },
  },

  rentPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  roomType: {
    type: String,
    required: true,
    enum: ["single", "shared", "studio", "apartment", "house"],
  },

  numberOfRooms: {
    type: Number,
    required: true,
    min: 1,
  },

  numberOfBathrooms: {
    type: Number,
    required: true,
    min: 1,
  },

  availabilityDate: {
    type: Date,
    required: true,
  },

  photos: {
    type: [String], // URLs to images
    default: [],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //   who the fuck are the renters
  renters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
});

RoomSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default RoomSchema;
