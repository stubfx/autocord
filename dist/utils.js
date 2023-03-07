import fetch from "node-fetch";
import Discord, { PermissionFlagsBits } from "discord.js";
import { discordClient } from "./discordbot.js";
export function rndArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export async function doesBotHavePermissions(guildId, permissions) {
    if (!guildId) {
        throw new Error('Missing guildId');
    }
    let fetchedGuild = await discordClient.guilds.fetch(guildId);
    return new Discord.PermissionsBitField(fetchedGuild.members.me.permissions).has(permissions, true);
}
export function bitFieldsToString(permissionBitFields) {
    return new Discord.PermissionsBitField(permissionBitFields).bitfield.toString();
}
export function getSessionExpirationDate() {
    let date = new Date();
    date.setDate(new Date().getDate() + 5);
    return date;
}
export function getCorrectHttpsUrl(string) {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return null;
    }
    // no http.
    // !url.host.includes("_") IS FOR DISCORD PURPOSES ONLY.
    /*url.protocol === "http:" || */
    if (url.protocol === "https:" && !url.host.includes("_") && !url.host.includes(" ")) {
        return string;
    }
    return null;
}
export function isGoogleUrl(url) {
    // throw exception if not valid, for obvious reasons.
    let tmpUrl = new URL(url);
    return tmpUrl.host.includes("news.google.com");
}
export function checkStringLength(string, max, min = 1) {
    // Primitives are a different kind of type than objects created from within Javascript,
    // therefore the check below will always be false.
    // if (string instanceof String) {
    if (typeof string === "string") {
        if (string.length > min && string.length < max) {
            return string;
        }
    }
    return null;
}
export function sendMessagesPermissionsInFetchedChannel(guildMember, channel) {
    let viewChannelPermission = guildMember.permissionsIn(channel).has(PermissionFlagsBits.ViewChannel);
    let sendPermission = guildMember.permissionsIn(channel).has(PermissionFlagsBits.SendMessages);
    return viewChannelPermission && sendPermission;
}
export async function fetchWithTimeout(resource, options = { timeout: 5000 }) {
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
export function getDiscordSanitizedMessage(text) {
    return text.replace(/[^a-zA-Z0-9: ()?!*]/g, "");
}
//# sourceMappingURL=utils.js.map