import FavouriteRepository from "./favourite.repository.js";

class FavouriteController {
  constructor() {
    this.favouriteRepository = new FavouriteRepository();
  }

  //get all the favourite room of the particular user
  async getFavourite(req, res) {
    const userId = req.userId;
    try {
      const rooms = await this.favouriteRepository.findFabByUserId(userId);

      const cleanedRoom = rooms.map((room) => room.roomId);

      return res.status(200).json({ success: true, rooms: cleanedRoom });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  async toggleFavourite(req, res) {
    const roomId = req.params.id;
    const userId = req.userId;

    const isRoom = await this.favouriteRepository.findFabByRoomId(
      userId,
      roomId
    );

    if (!isRoom) {
      let toggleFavouriteRoom = await this.favouriteRepository.addFavoutieRoom(
        userId,
        roomId
      );

      return res
        .status(200)
        .send({ success: true, message: "Room is added to Favourite" });
    } else {
      let toggleFavouriteRoom = await this.favouriteRepository.findAndDelete(
        userId,
        roomId
      );
      return res
        .status(200)
        .send({ success: true, message: "Room is removed from Favourite" });
    }
  }

  async isFabRoom(req, res) {
    const roomId = req.params.id;
    const userId = req.userId;
    try {
      const room = await this.favouriteRepository.findFabByRoomId(
        userId,
        roomId
      );
      return res.status(200).send(room);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }
}

export default FavouriteController;
