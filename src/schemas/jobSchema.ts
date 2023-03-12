import mongoose from "mongoose";
import {JOB} from "./schemas.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {JobInterface} from "../models/JobInterface";
import {ChainLinkParam} from "../models/ChainLinkInterface";

const Schema = new mongoose.Schema<JobInterface>({
    name: String,
    chain: {
        chainLinks: Array<{
            type: ChainLinkTypes.LinkType,
            // description: String, // do not save in db.
            params: Array<ChainLinkParam>,
            id: String
        }>
    }
});

// Duplicate the ID field.
Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Schema.set('toJSON', {
    virtuals: true
});


export const JobModel = mongoose.model<JobInterface>(JOB, Schema)