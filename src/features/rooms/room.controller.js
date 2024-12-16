import RoomRepository from "./room.repository.js";

export default class RoomController {
  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async getRoomDetails(req, res) {
    const id = req.params.id;
    try {
      let rooms = await this.roomRepository.getRoomDetails(id);
      let { homeAddress, name, houseName } = rooms.owner;
      const cleanedRoom = { ...rooms, owner: { homeAddress, name, houseName } };
      res.json({ success: true, room: cleanedRoom });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //registerRoom Controller
  async registerRoom(req, res) {
    const roomObj = req.body;
    roomObj.owner = req.cookies.userId;
    try {
      const result = await this.roomRepository.registerRoom(roomObj);
      res.json({ success: true, room: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //get all the room controller
  async getAllRoom(req, res) {
    try {
      const rooms = await this.roomRepository.allRooms();
      res.json({ success: true, rooms });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //get room by owner id
  async getRoomsByOwnerId(req, res) {
    const ownerId = req.cookies.userId;
    // console.log(ownerId);
    try {
      const rooms = await this.roomRepository.getRoomsByOwnerId(ownerId);
      res.status(200).json({ success: true, message: rooms });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //delete the room by id controller
  async deleteRoom(req, res) {
    const { id } = req.params;
    try {
      const result = await this.roomRepository.deleteRoom(id);
      if (result) {
        return res
          .status(200)
          .json({ success: true, message: "Room deleted successfully!" });
      } else {
        return res
          .status(404)
          .json({ success: true, message: "Room not found!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //update the room by id controller
  async updateRoom(req, res) {
    const roomId = req.params.id;
    const roomObj = req.body;
    try {
      const room = await this.roomRepository.getRoomById(roomId);

      if (!room) {
        return res
          .status(404)
          .json({ success: false, message: "Room not found" });
      }

      Object.assign(room, roomObj);
      await room.save();
      return res.json({ success: true, message: room });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //toggle room assingment controller
  async toggleRoomAssign(req, res) {
    const roomId = req.params.roomId;
    try {
      let room = await this.roomRepository.getRoomById(roomId);
      room.isAvailable = !room.isAvailable;
      await room.save();
      return res.json({ success: true, message: "Room is toggled!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  //get room by status available or not by landlords
  async getAvailableRoom(req, res) {
    let rooms = await this.roomRepository.availableRoom();
    return res.status(200).json({ success: true, message: rooms });
  }

  async getUnAvailableRoom(req, res) {
    let rooms = await this.roomRepository.unAvailableRoom();
    return res.status(200).json({ success: true, message: rooms });
  }
}
