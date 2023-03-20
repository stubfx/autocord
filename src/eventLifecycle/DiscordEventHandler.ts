import Discord, {GuildMember, VoiceState} from "discord.js";
import {LoggerHelper} from "../loggerHelper.js";
import * as EventHandler from "./EventHandler.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {discordClient} from "../discordbot.js";
import * as dbAdapter from "../db/dbAdapter.js";
import {AppDataHandler} from "../appDataHandler.js";


let client = null

function isMe_id(id) {
    return discordClient.user.id === id
}

export function init(discordClient: Discord.Client) {
    client = discordClient
    client.on(Discord.Events.GuildCreate, async guild => {
        AppDataHandler.increaseEventCount()
        try {
            // bot joined a build <3
            LoggerHelper.success(`Joined Guild: ${guild.name}(${guild.id})`)
            await dbAdapter.createGuildWithStorage(guild.id)
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    client.on(Discord.Events.GuildDelete, async guild => {
        AppDataHandler.increaseEventCount()
        try {
            // bot left a build
            LoggerHelper.error(`just left: ${guild.id} ${guild.name}`)
            await dbAdapter.removeGuild(guild.id)
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    // client.on(Discord.Events.ChannelDelete, async channel => {
    //     // await dbAdapter.removeNewsChannel(channel)
    // })

    client.on(Discord.Events.MessageCreate, async data => {
        AppDataHandler.increaseEventCount()
        try {
            if (isMe_id(data.author.id)) return
            await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.IDs.Event.MessageCreate, {
                channelId: data.channelId,
                userId: data.author.id,
                username: data.author.username,
                messageId: data.id,
                messageContent: data.content,
            })
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    client.on(Discord.Events.MessageReactionAdd, async (data, user) => {
        AppDataHandler.increaseEventCount()
        try {
            if (isMe_id(user.id)) return
            await EventHandler.runEventForGuild(data.message.guild.id, ChainLinkTypes.IDs.Event.MessageReactionAdd, {
                userId: user.id,
                username: user.username
            })
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    // user joins a guild
    client.on(Discord.Events.GuildMemberAdd, async (data: GuildMember) => {
        AppDataHandler.increaseEventCount()
        try {
            console.log(data)
            await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.IDs.Event.GuildMemberAdd, {
                username: data.user.username,
                userId: data.user.id
            })
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    // random user joins voice channel, (we cannot check the user unfortunately.)
    client.on(Discord.Events.VoiceStateUpdate, async (oldState: VoiceState, newState: VoiceState) => {
        AppDataHandler.increaseEventCount()
        try {
            await EventHandler.runEventForGuild(newState.guild.id, ChainLinkTypes.IDs.Event.VoiceStateUpdate, {
                channelId: newState.channelId || oldState.channelId,
                channelName: newState.channel ? newState.channel.name : oldState.channel.name,
                userId: newState.member ? newState.member.id : newState.member.id,
                username: newState.member ? newState.member.user.username : newState.member.user.username,
                memberCount: newState.channel ? newState.channel.members.size : oldState.channel.members.size,
                oldChannelMemberCount: oldState.channel ? oldState.channel.members.size : 0,
                action: newState.channelId ? 'JOIN' : 'LEFT'
            }, {oldVoiceState: oldState, newVoiceState: newState})
        } catch (e) {
            LoggerHelper.error(e)
        }
    })

    client.on(Discord.Events.ChannelCreate, async data => {
        AppDataHandler.increaseEventCount()
        try {
            await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.IDs.Event.ChannelCreate)
        } catch (e) {
            LoggerHelper.error(e)
        }
    })
}