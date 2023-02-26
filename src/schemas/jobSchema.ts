import mongoose from "mongoose";
import {JOB} from "./schemas.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {JobInterface} from "../models/JobInterface";

const Schema = new mongoose.Schema<JobInterface>({
    name: String,
    chain: Array< {
        name: String,
        chain: Array<{
            type: ChainLinkTypes.LinkType,
            params: Array<String>,
            name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event
        }>
    }>
});

// Duplicate the ID field.
Schema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Schema.set('toJSON', {
    virtuals: true
});


export const JobModel = mongoose.model<JobInterface>(JOB, Schema)