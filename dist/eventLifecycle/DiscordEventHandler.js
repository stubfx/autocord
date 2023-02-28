import Discord from "discord.js";
import * as LoggerHelper from "../loggerHelper.js";
import * as EventHandler from "./EventHandler.js";
import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
let client = null;
export function init(discordClient) {
    client = discordClient;
    client.on(Discord.Events.GuildCreate, guild => {
        // bot joined a build <3
        LoggerHelper.success(`Joined Guild: ${guild.name}(${guild.id})`);
    });
    client.on(Discord.Events.GuildDelete, async (guild) => {
        // bot left a build
        LoggerHelper.error(`just left: ${guild.id} ${guild.name}`);
        // await dbAdapter.removeGuild(guild)
    });
    // client.on(Discord.Events.ChannelDelete, async channel => {
    //     // await dbAdapter.removeNewsChannel(channel)
    // })
    client.on(Discord.Events.MessageCreate, async (data) => {
        if (data.author.id === client.user.id) {
            // hey, that's me!
            return;
        }
        await EventHandler.runEventForGuilds(data.guild.id, ChainLinkTypes.Event.MessageCreate, {
            channelId: data.channelId,
            userId: data.author.id,
            username: data.author.username,
            messageContent: data.content
        });
    });
    client.on(Discord.Events.MessageReactionAdd, async (data, user) => {
        await EventHandler.runEventForGuilds(data.message.guild.id, ChainLinkTypes.Event.MessageReactionAdd, {
            userId: user.id,
            username: user.username,
            emojiName: data.emoji.name
        });
    });
    // user joins a guild
    client.on(Discord.Events.GuildMemberAdd, async (data) => {
        await EventHandler.runEventForGuilds(data.message.guild.id, ChainLinkTypes.Event.GuildMemberAdd);
    });
    // random user joins voice channel, (we cannot check the user unfortunately.)
    client.on(Discord.Events.VoiceStateUpdate, async (data) => {
        await EventHandler.runEventForGuilds(data.guild.id, ChainLinkTypes.Event.VoiceStateUpdate);
    });
    client.on(Discord.Events.ChannelCreate, async (data) => {
        await EventHandler.runEventForGuilds(data.guild.id, ChainLinkTypes.Event.ChannelCreate);
    });
}
//# sourceMappingURL=DiscordEventHandler.js.map