import express from "express";
import UserController from "./user.controller.js";
import adminAuth from "../../middleware/adminAuth.js";
import jwtAuth from "../../middleware/jwtAuth.js";

const userRouter = express.Router();
const userController = new UserController();

//get all the users
userRouter.get("/", adminAuth, (req, res) => {
  userController.getAllUsers(req, res);
});

//get all the landowners
userRouter.get("/landowners-list", adminAuth, (req, res) => {
  userController.getAllLandlords(req, res);
});

//get all the Renters
userRouter.get("/renters-list", adminAuth, (req, res) => {
  userController.getAllRenters(req, res);
});

//route to register user
userRouter.post("/register", (req, res) => {
  userController.registerUser(req, res);
});

//route to login user
userRouter.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

//route to logout user
userRouter.post("/logout", (req, res) => {
  userController.logout(req, res);
});

//route to edit user
userRouter.put("/editprofile", jwtAuth, (req, res) => {
  userController.editProfile(req, res);
});

//route to delete user
userRouter.delete("/delete/:id", adminAuth, (req, res) => {
  userController.deleteUser(req, res);
});

//route of forget password
userRouter.post("/password/forget", (req, res) => {
  userController.forgetPassword(req, res);
});

//route to reset password
userRouter.post("/password/reset/:token", (req, res) => {
  userController.resetPassword(req, res);
});

//route to update password
userRouter.put("/password/update", (req, res) => {
  userController.updatePassword(req, res);
});

export default userRouter;
