import Discord, { Events, GatewayIntentBits, IntentsBitField, Partials } from "discord.js";
import * as LoggerHelper from "./loggerHelper.js";
export function init(onReady) {
    const client = new Discord.Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, GatewayIntentBits.MessageContent,
            IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessageReactions], partials: [Partials.Message, Partials.Reaction, Partials.Channel] });
    client.on(Events.ClientReady, async () => {
        LoggerHelper.dev(`Logged in as ${client.user.tag}!`);
        onReady(client);
    });
    client.login(process.env.discord_token).catch(reason => {
        LoggerHelper.info(reason);
    });
}
//# sourceMappingURL=discordbot.js.map