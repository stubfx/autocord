import mongoose from "mongoose";
import {GUILD, JOB, STORAGE} from "./schemas.js";
import {GuildInterface} from "../models/GuildInterface.js";

const Schema = new mongoose.Schema<GuildInterface>({
    guildId: String,
    jobs: [{ type: mongoose.Types.ObjectId, ref: JOB }],
    // @ts-ignore
    storage: { type: mongoose.Types.ObjectId, ref: STORAGE }
});


export const GuildModel = mongoose.model<GuildInterface>(GUILD, Schema)