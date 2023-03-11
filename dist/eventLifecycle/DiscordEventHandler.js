import Discord from "discord.js";
import { LoggerHelper } from "../loggerHelper.js";
import * as EventHandler from "./EventHandler.js";
import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
import { discordClient } from "../discordbot.js";
import * as dbAdapter from "../db/dbAdapter.js";
let client = null;
function isMe_id(id) {
    return discordClient.user.id === id;
}
export function init(discordClient) {
    client = discordClient;
    client.on(Discord.Events.GuildCreate, guild => {
        // bot joined a build <3
        LoggerHelper.success(`Joined Guild: ${guild.name}(${guild.id})`);
    });
    client.on(Discord.Events.GuildDelete, async (guild) => {
        // bot left a build
        LoggerHelper.error(`just left: ${guild.id} ${guild.name}`);
        await dbAdapter.removeGuild(guild.id);
    });
    // client.on(Discord.Events.ChannelDelete, async channel => {
    //     // await dbAdapter.removeNewsChannel(channel)
    // })
    client.on(Discord.Events.MessageCreate, async (data) => {
        if (isMe_id(data.author.id))
            return;
        await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.Event.MessageCreate, {
            channelId: data.channelId,
            userId: data.author.id,
            username: data.author.username,
            messageId: data.id,
            messageContent: data.content,
        });
    });
    client.on(Discord.Events.MessageReactionAdd, async (data, user) => {
        if (isMe_id(user.id))
            return;
        await EventHandler.runEventForGuild(data.message.guild.id, ChainLinkTypes.Event.MessageReactionAdd, {
            userId: user.id,
            username: user.username
        });
    });
    // user joins a guild
    client.on(Discord.Events.GuildMemberAdd, async (data) => {
        console.log(data);
        await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.Event.GuildMemberAdd, {
            username: data.user.username,
            userId: data.user.id
        });
    });
    // random user joins voice channel, (we cannot check the user unfortunately.)
    client.on(Discord.Events.VoiceStateUpdate, async (oldState, newState) => {
        await EventHandler.runEventForGuild(newState.guild.id, ChainLinkTypes.Event.VoiceStateUpdate, {
            channelId: newState.channelId || oldState.channelId,
            channelName: newState.channel ? newState.channel.name : oldState.channel.name,
            userId: newState.member ? newState.member.id : newState.member.id,
            username: newState.member ? newState.member.user.username : newState.member.user.username,
            memberCount: newState.channel ? newState.channel.members.size : oldState.channel.members.size,
            oldChannelMemberCount: oldState.channel ? oldState.channel.members.size : 0,
            action: newState.channelId ? 'JOIN' : 'LEFT'
        }, { oldVoiceState: oldState, newVoiceState: newState });
    });
    client.on(Discord.Events.ChannelCreate, async (data) => {
        await EventHandler.runEventForGuild(data.guild.id, ChainLinkTypes.Event.ChannelCreate);
    });
}
//# sourceMappingURL=DiscordEventHandler.js.map