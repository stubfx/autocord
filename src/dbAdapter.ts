import topicsData from "./datamodels/topicsData.js";
import * as Utils from "./utils.js";
import * as LoggerHelper from "./loggerHelper.js";
import mongoose from "mongoose"
import {Job} from "./models/pipeline/Job.js";
import {GuildModel} from "./schemas/guildSchema.js";
import {AggregatedGuildInterface} from "./models/GuildInterface.js";
import {JobModel} from "./schemas/jobSchema.js";
import {GuildStorage} from "./schemas/guildStorageSchema.js";
import {JOBS, STORAGE} from "./schemas/schemas.js";


const DEFAULT_TOPIC = "top";
let mongooseConnection = null

export async function init() {
    mongoose.set('strictQuery', false);
    mongooseConnection = await mongoose.connect(process.env.db_conn_string, {dbName: process.env.db_collection_name});
}

async function saveJobToDB(job: Job) {
    return await new JobModel(job.toJobInterface()).save()
}

export async function deleteJob(guildId, job: Job): Promise<Boolean> {
    let guild = await getGuild(guildId)
    let hasId = !!job.id
    if (hasId) {
        // only if the guild exists
        // and has the job inside.
        if (guild && !!guild.jobs.find(el => el._id.toString() === job.id)) {
            await JobModel.deleteOne({_id: job.id})
            return true
        }
        // mmmm, sketchy stuff here.
        LoggerHelper.error(new Error("Job already has an id, but it does not match the guild?"))
        return false
    }
}

export async function addStorageData(guildId: string, storageDataName: string) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        [`data.${storageDataName}`]: 0
    })
    return true
}

export async function deleteStorageData(guildId: string, storageDataName: string) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        $unset : {[`data.${storageDataName}`]: ""}
    })
    return true
}

async function createGuildWithJob(guildId, mongoJobId: mongoose.Types.ObjectId) {
    // first make sure to create the storage for this guild!
    let storage = await new GuildStorage({
        data: {}
    }).save()
    await new GuildModel({
        guildId: guildId,
        jobs: [mongoJobId],
        storage: storage._id
    }).save()
}

export async function saveJob(guildId, job: Job): Promise<Boolean> {
    let guild = await getGuild(guildId)
    let hasId = !!job.id
    if (hasId) {
        // only if the guild exists
        // and has the job inside.
        if (guild && !!guild.jobs.find(el => el._id.toString() === job.id)) {
            await JobModel.findOneAndReplace({_id: job.id}, job.toJobInterface())
            return true
        }
        // mmmm, sketchy stuff here.
        LoggerHelper.error(new Error("Job already has an id, but it does not match the guild?"))
        return false
    } else {
        // then this must be a new job, awesome!
        // do we already have the guild?
        if (guild) {
            // ok let's check if there are already 3 jobs inside then!
            if (guild.jobs.length > 3) {
                // guild has already 3 jobs
                // unlucky :/
                return false
            }
            // less than 3 jobs here, add it!
            let saved = await saveJobToDB(job)
            guild.jobs.push(new mongoose.Types.ObjectId(saved._id))
            // ok, just update it then.
            guild.save()
            return true
        }
        // no guild, no job, must be a new user, welcome!
        let saved = await saveJobToDB(job)
        // in this case the guild does not exist!
        await createGuildWithJob(guildId, saved._id)
        return true
    }
}

// export async function withGuild(guildId: string, func: (guildInterface: GuildInterface) => Promise<void>) {
//     let guild = JobGuildModel.findOne({guildId: guildId});
//     if (guild) {
//         // @ts-ignore
//         await func(guild as GuildInterface)
//     }
// }

export async function getGuild(guildId: string) {
    return GuildModel.findOne({guildId: guildId}).populate(STORAGE).populate(JOBS)
}

export async function increaseStorageCounter(storageId: string, counterName: string) {
    await GuildStorage.findOneAndUpdate({_id: storageId}, {
        $inc: {[`data.${counterName}`]: 1}
    })
}

export async function forGuildListeningForEvent(guildId: string, eventName, func: (guildInterface: AggregatedGuildInterface) => Promise<void>) {
    let guild = await GuildModel.findOne({guildId: guildId})
        .populate(STORAGE)
        .populate({
            path: JOBS,
            match: {'chain.chainLinks.0.name': eventName}
        })
    if (!guild) {
        // no guild, no party.
        return
    }
    // @ts-ignore
    await func(guild as AggregatedGuildInterface)
}

let invitesCache = {};
let topicsCache = {};
/**
 * holds current articles for this news batch
 * so each server that has the same combo (topic+language) will receive the same one.
 */
let currentArticlesCache = {}

export function prepareForNewBatch() {
    clearTopicsCache()
    clearCurrentArticlesCache()
}

export function clearTopicsCache() {
    topicsCache = {}
}

export function clearInvitesCache() {
    invitesCache = {}
}


export function clearCurrentArticlesCache() {
    currentArticlesCache = {}
}


export function getCurrentTopicQuery(topic) {
    let topicData = topicsData[topic];
    // this should never happen, but do it just in case.
    // if we see the error it means that somebody has found a way to sneak custom topics inside the command,
    // or the topic has just been removed :/
    if (!topicData) {
        LoggerHelper.error(`Topic Error: ${topic} --- This topic does not exist!`)
        topicData = topicsData[DEFAULT_TOPIC]
    }
    // check in the cache!
    if (topicsCache[topic]) {
        // LoggerHelper.info(`Topic cache: ${topicsCache[topic]} found topic in cache`)
        return topicsCache[topic]
    } else {
        // well, looks like we need a new one!
        let rndQuery = Utils.rndArrayItem(topicData.queries);
        // replace spaces with +
        rndQuery = rndQuery.trim().split(/ +/g).join("+")
        topicsCache[topic] = rndQuery
        return rndQuery
    }
}