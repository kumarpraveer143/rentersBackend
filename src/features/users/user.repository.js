import UserSchema from "./user.schema.js";
import mongoose from "mongoose";

const userModel = mongoose.model("User", UserSchema);

export default class UserRepository {
  //register user controller
  async registerUser(userObj) {
    const user = new userModel(userObj);
    await user.save();
    return user;
  }

  //find user by userId
  async getUserById(id) {
    const user = userModel.findOne({ _id: id });
    return user;
  }

  //find user by email controller
  async findUserByEmail(factor, withPassword = false) {
    if (withPassword)
      return await userModel.findOne(factor).select("+password");
    return await userModel.findOne(factor);
  }

  //find user for password reset
  async findUserForPasswordReset(hashToken) {
    return await userModel.findOne({
      resetPasswordToken: hashToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  }

  //get all the users controller
  async getAllUsers() {
    return await userModel.find({});
  }

  //update user
  async updateUserById(id, data) {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      { ...data }
    );
    return updatedUser;
  }

  //delete a particular user
  async deleteUser(_id) {
    return await userModel.findOneAndDelete(_id);
  }

  //get all the renters only
  async getAllRenters() {
    return await userModel.find({ userType: "renter" });
  }

  //get all the landlords only
  async getAllLandlords() {
    return await userModel.find({ userType: "landowner" });
  }
}
