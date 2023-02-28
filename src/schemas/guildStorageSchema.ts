import mongoose from "mongoose";
import {STORAGE} from "./schemas.js";
import {GuildStorageInterface} from "../models/GuildStorageInterface";

const Schema = new mongoose.Schema<GuildStorageInterface>({
    data: Object
});


export const GuildStorage = mongoose.model<GuildStorageInterface>(STORAGE, Schema)