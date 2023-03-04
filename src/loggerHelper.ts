import Discord, {EmbedBuilder} from "discord.js";

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

class LoggerHelperClazz {

    private client

    init(discordClient: Discord.Client) {
        this.client = discordClient
    }

    sendToDiscord(data, hexColor: number) {
        if (!process.env.dev) {
            this.client.channels.fetch(process.env.discord_log_channel_id)
                .then(async channel => {
                    // await channel.send({embeds: [exampleEmbed]});
                    await channel.send({embeds: [this.getLogEmbed(hexColor, data)]});
                })
                .catch(console.error);
        }
    }

    error(...data) {
        console.error(data)
        this.sendToDiscord(data, 0xED4245);
    }

    warn(...data) {
        console.warn(data)
        this.sendToDiscord(data, 0xFCBA03);
    }

    consoleError(data) {
        console.error(data)
    }

    success(...data) {
        console.info(data)
        this.sendToDiscord(data, 0x57F287)
    }

    info(...data) {
        console.log(data)
        this.sendToDiscord(data, 0x3498DB)
    }

    dev(data) {
        console.log(data);
    }

    /**
     * @param {number}HexColor
     * @param {Array<any>}data
     * @param autoBreakLine
     * @return {EmbedBuilder}
     */
    getLogEmbed(HexColor, data, autoBreakLine = true) {
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
}

export const LoggerHelper = new LoggerHelperClazz()