import express from "express";
import FavouriteController from "./favourite.controller.js";
import jwtAuth from "../../middleware/jwtAuth.js";

const favouriteRouter = express.Router();

const favouriteController = new FavouriteController();

favouriteRouter.get("/toggle/:id", jwtAuth, (req, res) => {
  favouriteController.toggleFavourite(req, res);
});

favouriteRouter.get("/myfavourite", jwtAuth, (req, res) => {
  favouriteController.getFavourite(req, res);
});

favouriteRouter.get("/isFabRoom/:id", jwtAuth, (req, res) => {
  favouriteController.isFabRoom(req, res);
});

export default favouriteRouter;
