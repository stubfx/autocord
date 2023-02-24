import topicsData from "./datamodels/topicsData.js";
import * as Utils from "./utils.js";
import * as LoggerHelper from "./loggerHelper.js";
import mongoose from "mongoose"
import {Job} from "./models/pipeline/Job.js";
import {JobGuildModel} from "./schemas/guild.js";
import {GuildInterface} from "./models/GuildInterface";


const DEFAULT_TOPIC = "top";
let mongooseConnection = null

export async function init() {
    mongoose.set('strictQuery', false);
    mongooseConnection = await mongoose.connect(process.env.db_conn_string, {dbName: process.env.db_collection_name});
}

export async function saveJob(guildId, job: Job): Promise<Boolean> {
    let guild = await getGuild(guildId)
    if (guild) {
        if (guild.jobs.length > 3) {
            return false
        }
        guild.jobs.push(job.toJobInterface())
        // ok, just update it then.
        guild.save()
        return true
    }
    // in this case the guild does not exist.
    await new JobGuildModel({
        guildId: guildId,
        jobs: job.toJobInterface()
    }).save()
    return true
}

export async function withGuild(guildId: string, func: (guildInterface: GuildInterface) => Promise<void>) {
    let guild = JobGuildModel.findOne({guildId: guildId});
    if (guild) {
        // @ts-ignore
        await func(guild as GuildInterface)
    }
}

export async function getGuild(guildId: string) {
    return JobGuildModel.findOne({guildId: guildId})
}

export async function forGuildListeningForEvent(guildId: string, eventName, func: (guildInterface: GuildInterface) => Promise<void>) {
    let guild = await JobGuildModel.findOne({guildId: guildId, "jobs.firedOn": eventName})
    await func(guild as GuildInterface)
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