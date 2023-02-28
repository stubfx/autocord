import {JobInterface} from "./JobInterface.js";
import mongoose from "mongoose";
import {GuildStorageInterface} from "./GuildStorageInterface";

export interface GuildInterface {
    guildId: string
    storage: mongoose.Types.ObjectId
    jobs: Array<mongoose.Types.ObjectId>
}

export interface AggregatedGuildInterface {
    guildId: string
    storage: GuildStorageInterface
    jobs: Array<JobInterface>
}