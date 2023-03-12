import mongoose from "mongoose";
import {APPDATA} from "./schemas.js";
import {AppDataInterface} from "../models/AppDataInterface.js";

const Schema = new mongoose.Schema<AppDataInterface>({
    eventCount: Number
});


export const AppDataModel = mongoose.model<AppDataInterface>(APPDATA, Schema)