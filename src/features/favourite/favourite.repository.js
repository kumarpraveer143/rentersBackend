import mongoose from "mongoose";
import favouriteSchema from "./favourite.schema.js";

const favouriteModel = mongoose.model("Favourite", favouriteSchema);

class FavouriteRepository {
  async addFavoutieRoom(userId, roomId) {
    const favourite = new favouriteModel({ userId, roomId });
    await favourite.save();
    return favourite;
  }

  async findFabByRoomId(userId, roomId) {
    const fab = await favouriteModel.findOne({ roomId, userId });
    return fab;
  }

  async findFabByUserId(userId) {
    const fabRooms = await favouriteModel
      .find({ userId })
      .populate("roomId")
      .lean();

    return fabRooms;
  }

  async findAndDelete(userId, roomId) {
    const remove = await favouriteModel.findOneAndDelete({ userId, roomId });
  }
}

export default FavouriteRepository;
