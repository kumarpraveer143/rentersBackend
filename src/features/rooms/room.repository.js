import RoomSchema from "./room.schema.js";
import mongoose from "mongoose";

const RoomModel = mongoose.model("Room", RoomSchema);

class RoomRepository {
  async getRoomDetails(id) {
    const room = await RoomModel.findOne({ _id: id }).populate("owner").lean();
    return room;
  }

  //get room by id
  async getRoomById(id) {
    const room = await RoomModel.findOne({ _id: id });
    return room;
  }

  //get availabe room
  async availableRoom() {
    const room = await RoomModel.find({ isAvailable: true });
    return room;
  }

  //get unAvailable rooms
  async unAvailableRoom() {
    const room = await RoomModel.find({ isAvailable: false });
    return room;
  }

  //register room repo
  async registerRoom(roomObj) {
    const room = new RoomModel(roomObj);
    await room.save();
    return room;
  }

  //get rooms by owner id
  async getRoomsByOwnerId(id) {
    return await RoomModel.find({ owner: id });
  }

  //return all the rooms repo
  async allRooms() {
    return await RoomModel.find({});
  }

  //delete room by id
  async deleteRoom(id) {
    return await RoomModel.findOneAndDelete(id);
  }
}
export default RoomRepository;
