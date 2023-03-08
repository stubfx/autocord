import Discord, {ActivityType, Events, GatewayIntentBits, IntentsBitField, Partials} from "discord.js";
import {LoggerHelper} from "./loggerHelper.js";

export let discordClient : Discord.Client

let isPlayingHelp = true

export function init(onReady: (client: Discord.Client) => {}) {
    discordClient = new Discord.Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, GatewayIntentBits.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers], partials: [Partials.Message, Partials.Reaction, Partials.Channel]});
    discordClient.on(Events.ClientReady, async () => {
        LoggerHelper.dev(`Logged in as ${discordClient.user.tag}!`);
        changeActivityTask()
        onReady(discordClient)
    });

    discordClient.login(process.env.discord_token).catch(reason => {
        LoggerHelper.info(reason)
    });
}

function changeActivityTask() {
    discordClient.user.setActivity("/help", {type: ActivityType.Playing})
    setInterval(() => {
        let activity
        if (isPlayingHelp) {
            activity = "/help"
        } else {
            activity = "/dashboard"
        }
        isPlayingHelp = !isPlayingHelp
        discordClient.user.setActivity(activity, {type: ActivityType.Playing})
    }, 10 * 60 * 1000)
}