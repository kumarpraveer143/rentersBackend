import HistoryRepository from "./history.schema";
import mongoose from "mongoose";

const HistoryModel = mongoose.model("History" , HistoryRepository);

class HistoryRepository {
    // todo :: making a 
    async createHistory(history){
        const history = new HistoryModel(history);
        await history.save();
        return history;
    }

    // todo :: return all history records
    async allHistory(){
        return await HistoryModel.find({});
    }

    // todo :: return histroy of landowner
    async ownerHistory(ownerID){
        return await HistoryModel.find({ownerID});
    }

    // todo :: return histroy of renter
    async ownerHistory(renter){
        return await HistoryModel.find({renter});
    }
}