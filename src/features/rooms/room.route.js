import express from "express";
import RoomController from "./room.controller.js";
import landOwnerAuth from "../../middleware/landOwners.js";
import adminAuth from "../../middleware/adminAuth.js";

const roomRouter = express.Router();

const roomController = new RoomController();

//add new room
roomRouter.post("/", landOwnerAuth, (req, res) => {
  roomController.registerRoom(req, res);
});

//view room details(get all rooms)
roomRouter.get("/getAllRoomsDetails", adminAuth, (req, res) => {
  roomController.getAllRoom(req, res);
});

//get room by owner id
roomRouter.get("/myRoom", landOwnerAuth, (req, res) => {
  roomController.getRoomsByOwnerId(req, res);
});

//delete room
roomRouter.delete("/:id", landOwnerAuth, (req, res) => {
  roomController.deleteRoom(req, res);
});

//update room details
roomRouter.patch("/:id", landOwnerAuth, (req, res) => {
  roomController.updateRoom(req, res);
});

//toogle isavailable room by the landowner!
roomRouter.post("/toggle-room/:roomId", landOwnerAuth, (req, res) => {
  roomController.toggleRoomAssign(req, res);
});

//get rooms by status!
roomRouter.get("/availableRoom", adminAuth, (req, res) => {
  roomController.getAvailableRoom(req, res);
});

roomRouter.get("/unAvailableRoom", adminAuth, (req, res) => {
  roomController.getUnAvailableRoom(req, res);
});

export default roomRouter;
