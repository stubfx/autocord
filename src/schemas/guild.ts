import mongoose from "mongoose";
import {JOBGUILD} from "./schemas.js";
import {GuildInterface} from "../models/GuildInterface";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";

const Schema = new mongoose.Schema<GuildInterface>({
    guildId: String,
    jobs: Array< {
        name: String,
        firedOn: String,
        chain: Array<{
            type: ChainLinkTypes.LinkType,
            params: Array<String>,
            name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event
        }>
    }>
});


export const JobGuildModel = mongoose.model<GuildInterface>(JOBGUILD, Schema)