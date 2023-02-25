import {JobInterface} from "./JobInterface.js";
import mongoose from "mongoose";

export interface GuildInterface {
    guildId: string

    jobs: Array<mongoose.Types.ObjectId>
}

export interface AggregatedGuildInterface {
    guildId: string

    jobs: Array<JobInterface>
}