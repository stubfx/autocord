import topicsData from "./datamodels/topicsData.js";
import fetch from "node-fetch";
import locales from './datamodels/locales.js'
import {GuildChannelResolvable, GuildMember, PermissionFlagsBits} from "discord.js";

export function rndArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function getSessionExpirationDate() : Date{
    let date = new Date()
    date.setDate(new Date().getDate() + 5)
    return date
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

export function getTimageFromTopicValue(topicValue) {
    if ((topicsData[topicValue])) {
        let imageLinks = topicsData[topicValue].images;
        return imageLinks ? rndArrayItem(imageLinks) : null
    }
    return `ERROR(${topicValue})`
}

export function getNameFromTopicValue(topicValue) {
    if ((topicsData[topicValue])) {
        return topicsData[topicValue].name
    }
    return `ERROR(${topicValue})`
}

export function getNameFromLanguageValue(languageValue) {
    let find = locales.find(value => value.value === languageValue);
    if (find) {
        return find.name
    }
    return `ERROR(${languageValue})`
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