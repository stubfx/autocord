import topicsData from "./datamodels/topicsData.js";
import * as Utils from "./utils.js";
import * as LoggerHelper from "./loggerHelper.js";
import mongoose from "mongoose";
import { NewsGuild } from "./schemas.js";
export async function deleteChannelBrokenChannelProcess(channel) {
    if (process.env.dev)
        return;
    // will be improved later on.
    let currentNewsGuild = await findGuild(channel.guild.id);
    if (currentNewsGuild) {
        // look for the given channel
        let currentChannel = currentNewsGuild.channels.find(ch => ch.id === channel.id);
        currentChannel.error = true;
        // done. just save it.
        currentNewsGuild.save();
    }
}
export async function isChannelBroken(guildId, channelId) {
    // will be improved later on.
    let currentNewsGuild = await findGuild(guildId);
    if (currentNewsGuild) {
        // look for the given channel
        let currentChannel = currentNewsGuild.channels.find(ch => ch.id === channelId);
        return currentChannel.error;
    }
    return false;
}
const DEFAULT_TOPIC = "top";
let mongooseConnection = null;
export async function init() {
    mongoose.set('strictQuery', false);
    mongooseConnection = await mongoose.connect(process.env.db_guilds_conn_string, { dbName: process.env.db_guilds_name });
}
export async function forEachGuild(func) {
    let cursor = await NewsGuild.find().cursor();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        await func(doc);
    }
}
export async function findGuild(guildId) {
    return NewsGuild.findOne({ id: guildId });
}
export async function getSubscribedGuild(guildId) {
    let currentNewsGuild = await findGuild(guildId);
    if (currentNewsGuild && currentNewsGuild.channels && currentNewsGuild.channels.length > 0) {
        return currentNewsGuild;
    }
    else {
        return null;
    }
}
export async function addGuildPromoInvite(guildId, topic, text, inviteUrl) {
    let subscribedGuild = await getSubscribedGuild(guildId);
    if (subscribedGuild) {
        // ok add the invite then.
        subscribedGuild.promo = {
            enabled: true,
            invite: {
                topic: topic,
                url: inviteUrl,
                text: Utils.getDiscordSanitizedMessage(text)
            }
        };
        await subscribedGuild.save();
        return true;
    }
    return false;
}
export async function withGuild(guildId, func) {
    let newsGuild = NewsGuild.findOne({ id: guildId });
    if (newsGuild) {
        // @ts-ignore
        await func(newsGuild);
    }
}
export async function disableGuildPromo(guild) {
    let currentNewsGuild = await findGuild(guild.id);
    if (!currentNewsGuild) {
        currentNewsGuild = await createNewsGuild(guild);
    }
    if (currentNewsGuild) {
        currentNewsGuild.promo = { enabled: false, invite: null };
        await currentNewsGuild.save();
    }
}
export async function removeNewsChannel(channel, topic = null) {
    let found = false;
    let currentNewsGuild = await findGuild(channel.guild.id);
    if (currentNewsGuild) {
        let channels = currentNewsGuild.channels;
        if (channels) {
            let currentChannel = currentNewsGuild.channels.find(value => value.id === channel.id);
            if (currentChannel) {
                if (!topic) {
                    // if there is no topic, delete all topics from this channel.
                    // currentChannel.topics = []
                    // actually... just delete the channel.
                    currentNewsGuild.channels = currentNewsGuild.channels.filter(value => value.id !== currentChannel.id);
                    found = true;
                }
                else {
                    // topic is specific! Delete it only if the channel matches!
                    if (currentChannel.topics) {
                        // does the topic match the channel?
                        // so we keep everything except for the specified topic
                        currentChannel.topics = currentChannel.topics.filter(value => {
                            // if you find the element
                            found = value.topic === topic;
                            // just say that it needs to be removed.
                            return !found;
                        });
                    }
                    if (currentChannel.topics.length === 0) {
                        // in this case there are no topics in this channel, just delete it.
                        currentNewsGuild.channels = currentNewsGuild.channels.filter(value => value.id !== currentChannel.id);
                    }
                }
            }
        }
    }
    if (found) {
        currentNewsGuild.save();
    }
    return found;
}
export async function removeGuild(guild) {
    // does not work without await ?
    // mongoose, what have you done?
    await NewsGuild.findOneAndDelete({ id: guild.id });
}
async function createNewsGuild(guild) {
    return await NewsGuild.create({
        id: guild.id,
        name: guild.name,
        channels: [],
        date: new Date()
    });
}
export async function addNewsChannel(guild, channel, user, topic, language) {
    let newTopic = {
        topic: topic,
        language: language,
        date: new Date(),
        user: {
            id: user.id,
            name: user.username
        }
    };
    let currentNewsGuild = await findGuild(guild.id);
    if (!currentNewsGuild) {
        currentNewsGuild = await createNewsGuild(guild);
    }
    let currentChannel = currentNewsGuild.channels.find(value => value.id === channel.id);
    if (!currentChannel) {
        // in this case the channel is missing, add it.
        // we cannot keep the reference of the object to change it, it's simply not linked to the document one anymore after the push.
        // add this new channel to the list,
        // that's important.
        currentNewsGuild.channels.push({
            id: channel.id,
            name: channel.name,
            error: false,
            topics: [newTopic]
        });
    }
    else {
        // in this case the channel list already exists.
        currentChannel.name = channel.name; // make sure to keep this up to date.
        // try to remove the error for now.
        currentChannel.error = false;
        // does the topic already exist in the channel tho?
        // if it does, no need to replace it.
        let found = currentChannel.topics.find(value => value.topic === topic && value.language === language);
        if (!found) {
            // well in this case we should add it.
            // create the new topic, it will be replaced with the old one.
            currentChannel.topics.push(newTopic);
        }
    }
    currentNewsGuild.save();
}
let invitesCache = {};
let topicsCache = {};
/**
 * holds current articles for this news batch
 * so each server that has the same combo (topic+language) will receive the same one.
 */
let currentArticlesCache = {};
export function prepareForNewBatch() {
    clearTopicsCache();
    clearCurrentArticlesCache();
}
export function clearTopicsCache() {
    topicsCache = {};
}
export function clearInvitesCache() {
    invitesCache = {};
}
export function clearCurrentArticlesCache() {
    currentArticlesCache = {};
}
export function getCurrentTopicQuery(topic) {
    let topicData = topicsData[topic];
    // this should never happen, but do it just in case.
    // if we see the error it means that somebody has found a way to sneak custom topics inside the command,
    // or the topic has just been removed :/
    if (!topicData) {
        LoggerHelper.error(`Topic Error: ${topic} --- This topic does not exist!`);
        topicData = topicsData[DEFAULT_TOPIC];
    }
    // check in the cache!
    if (topicsCache[topic]) {
        // LoggerHelper.info(`Topic cache: ${topicsCache[topic]} found topic in cache`)
        return topicsCache[topic];
    }
    else {
        // well, looks like we need a new one!
        let rndQuery = Utils.rndArrayItem(topicData.queries);
        // replace spaces with +
        rndQuery = rndQuery.trim().split(/ +/g).join("+");
        topicsCache[topic] = rndQuery;
        return rndQuery;
    }
}
export async function getRandomPromoInviteExceptThis(guildId, topic) {
    try {
        // check in cache first.
        let currentInvite = invitesCache[topic];
        if (currentInvite && currentInvite.guildId !== guildId) {
            // we already got a cached one apparently,
            // just use it.
            return currentInvite;
        }
        let found = await NewsGuild.aggregate([
            { $match: { id: { $ne: guildId }, "promo.enabled": true, "promo.invite.url": { $exists: true }, "promo.invite.topic": topic } },
            { $sample: { "size": 1 } }
        ]);
        if (found && found.length > 0) {
            let foundGuild = found[0];
            let result = foundGuild.promo.invite;
            // save it in cache by topic
            let invite = {
                guildName: foundGuild.name,
                guildId: guildId,
                topic: result.topic,
                url: result.url,
                text: result.text
            };
            invitesCache[topic] = invite;
            return invite;
        }
        return null;
    }
    catch (e) {
        LoggerHelper.error("Error fetching invite");
        LoggerHelper.error(e);
    }
}
//# sourceMappingURL=dbAdapter.js.map