import mongoose from "mongoose";

const historySchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  paymentID: {
    type: Schema.Types.String,
    required: false,
  },
  details: {
    location: {
      type: Schema.Types.String,
      required: false,
    },
    price: {
      type: Schema.Types.Number,
      required: false,
    },
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
