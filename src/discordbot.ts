import Discord, {Events, GatewayIntentBits, IntentsBitField, Partials} from "discord.js";
import * as LoggerHelper from "./loggerHelper.js";

export let discordClient : Discord.Client

export function init(onReady: (client: Discord.Client) => {}) {
    discordClient = new Discord.Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, GatewayIntentBits.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessageReactions], partials: [Partials.Message, Partials.Reaction, Partials.Channel]});
    discordClient.on(Events.ClientReady, async () => {
        LoggerHelper.dev(`Logged in as ${discordClient.user.tag}!`);
        onReady(discordClient)
    });

    discordClient.login(process.env.discord_token).catch(reason => {
        LoggerHelper.info(reason)
    });
}