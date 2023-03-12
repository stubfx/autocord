import fetch from "node-fetch";
import Discord, {GuildChannelResolvable, GuildMember, PermissionFlagsBits} from "discord.js";
import {discordClient} from "./discordbot.js";
import {AggregatedGuildInterface} from "./models/GuildInterface.js";
import {LoggerHelper} from "./loggerHelper.js";
import {ChainLinkTypes} from "./models/pipeline/chain/ChainLinkTypes.js";
import {DiscordAdapter} from "./DiscordAdapter.js";

export function rndArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export async function doesBotHavePermissions(guildId: string, permissions: bigint[]) : Promise<boolean> {
    if (!guildId) {
        throw new Error('Missing guildId')
    }
    let fetchedGuild = await discordClient.guilds.fetch(guildId)
    return new Discord.PermissionsBitField(fetchedGuild.members.me.permissions).has(permissions, true)
}

export function bitFieldsToString(permissionBitFields: any) : string {
    return new Discord.PermissionsBitField(permissionBitFields).bitfield.toString()
}

export function getSessionExpirationDate() : Date{
    let date = new Date()
    date.setDate(new Date().getDate() + 5)
    return date
}

export async function updateAllGuildCommands(guild: AggregatedGuildInterface) {
    // we are safe to make assumptions here
    // as not valid jobs should not be here anyway.
    // they could have unknown value, but cannot contain nulls.
    try {
        let commandsToAdd = [] // array of strings.
        if (guild) {
            if (guild.jobs) {
                for (let job of guild.jobs) {
                    if (job.chain.chainLinks[0].id === ChainLinkTypes.IDs.Event.COMMAND) {
                        // ok, that's a command, save it.
                        // param name doesn't matter, we get the first one.
                        commandsToAdd.push(job.chain.chainLinks[0].params[0].value)
                    }
                }
            }
        }
        if (commandsToAdd.length > 0) {
            await DiscordAdapter.updateCommandsForGuild(guild.guildId, commandsToAdd)
        }
    } catch (e) {
        LoggerHelper.error(e)
    }
}

export function getCorrectHttpsUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return null;
    }
    // no http.
    // !url.host.includes("_") IS FOR DISCORD PURPOSES ONLY.
    /*url.protocol === "http:" || */
    if (url.protocol === "https:" && !url.host.includes("_") && !url.host.includes(" ")) {
        return string
    }
    return null
}

export function isGoogleUrl(url: URL|string) {
    // throw exception if not valid, for obvious reasons.
    let tmpUrl = new URL(url)
    return tmpUrl.host.includes("news.google.com")
}

export function checkStringLength(string, max, min = 1) {
    // Primitives are a different kind of type than objects created from within Javascript,
    // therefore the check below will always be false.
    // if (string instanceof String) {
    if (typeof string === "string") {
        if (string.length > min && string.length < max) {
            return string
        }
    }
    return null
}

export function sendMessagesPermissionsInFetchedChannel(guildMember: GuildMember, channel: GuildChannelResolvable): Boolean {
    let viewChannelPermission = guildMember.permissionsIn(channel).has(PermissionFlagsBits.ViewChannel);
    let sendPermission = guildMember.permissionsIn(channel).has(PermissionFlagsBits.SendMessages);
    return viewChannelPermission && sendPermission
}

export async function fetchWithTimeout(resource, options = {timeout: 5000}) {
    const { timeout = 5000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        redirect: 'follow',
        follow: 3,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

export function getDiscordSanitizedMessage(text: string) {
    return text.replace(/[^a-zA-Z0-9: ()?!*]/g, "")
}