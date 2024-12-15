import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  houseName: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  userType: {
    type: String,
    enum: ["landowner", "renter", "admin"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please fill a valid phone number"],
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  homeAddress: {
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
      match: [/^\d{6}$/, "Please fill a valid 6-digit ZIP code"],
    },
  },

  aadharCardNumber: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^\d{4}-\d{4}-\d{4}$/, "Please fill a valid Aadhar Card number"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    let hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
  }
  next();
});

UserSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and updating resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await this.save();
  return resetToken;
};

export default UserSchema;
