import mongoose from "mongoose";
import {JOB, GUILD} from "./schemas.js";
import {GuildInterface} from "../models/GuildInterface.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";

const Schema = new mongoose.Schema<GuildInterface>({
    guildId: String,
    jobs: [{ type: mongoose.Types.ObjectId, ref: JOB }]
});


export const GuildModel = mongoose.model<GuildInterface>(GUILD, Schema)