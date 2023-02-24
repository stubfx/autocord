import mongoose from "mongoose";
import {JOBGUILD} from "./schemas.js";
import {GuildInterface} from "../models/GuildInterface";

const Schema = new mongoose.Schema<GuildInterface>({
    guildId: String,
    jobs: Array< {
        name: String,
        firedOn: String,
        chain: Array<{
            type: "CONDITION" | "TASK",
            params: Array<String>,
            name: "sendMessage"
        }>
    }>
});


export const JobGuildModel = mongoose.model<GuildInterface>(JOBGUILD, Schema)