import {EmbedBuilder} from "discord.js";

let client = null

// /**
//  *
//  * @param logArray
//  * @return {Array<any>}
//  */
// function getSanitizedLog(logArray) {
//     /**
//      *
//      * @type {Array<string>}
//      */
//     let log = []
//     for (let data of logArray) {
//         try {
//             log.push(data.toString().replace(/[^a-zA-Z0-9: ()?!]/g, "[%]"))
//         } catch (e) {
//             log.push(`"SANITIZE ERROR" : ${e}`)
//         }
//     }
//     return log
// }

export function init(discordClient) {
    client = discordClient
}

function sendToDiscord(data, hexColor: number) {
    if (!process.env.dev) {
        client.channels.fetch(process.env.discord_log_channel_id)
            .then(async channel => {
                // await channel.send({embeds: [exampleEmbed]});
                await channel.send({embeds: [getLogEmbed(hexColor, data)]});
            })
            .catch(console.error);
    }
}

export function error(...data) {
    console.error(data)
    sendToDiscord(data, 0xED4245);
}

export function warn(...data) {
    console.warn(data)
    sendToDiscord(data, 0xFCBA03);
}

export function consoleError(data) {
    console.error(data)
}

export function success(...data) {
    console.info(data)
    sendToDiscord(data, 0x57F287)
}

export function info(...data) {
    console.log(data)
    sendToDiscord(data, 0x3498DB)
}

export function dev(data) {
    console.log(data);
}

/**
 * @param {number}HexColor
 * @param {Array<any>}data
 * @param autoBreakLine
 * @return {EmbedBuilder}
 */
export function getLogEmbed(HexColor, data, autoBreakLine = true) {
    const linebreak = autoBreakLine ? "\n" : "";
    let log = ""
    for (let datum of data) {
        try {
            log += (datum.toString() + linebreak)
        } catch (e) {
            log += `"ERROR" : ${e}`
        }
    }
    return new EmbedBuilder()
        .setColor(HexColor)
        .setDescription(log)
}