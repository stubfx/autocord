import Discord, { Events, GatewayIntentBits, IntentsBitField } from "discord.js";
import * as LoggerHelper from "./loggerHelper.js";
import * as EventHandler from "./eventLifecycle/EventHandler.js";
export function init(onReady) {
    const client = new Discord.Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, GatewayIntentBits.MessageContent] });
    client.on(Events.ClientReady, async () => {
        LoggerHelper.dev(`Logged in as ${client.user.tag}!`);
        onReady(client);
    });
    client.on(Events.GuildCreate, guild => {
        // bot joined a build <3
        LoggerHelper.success(`Joined Guild: ${guild.name}(${guild.id})`);
    });
    client.on(Events.GuildDelete, async (guild) => {
        // bot left a build
        LoggerHelper.error(`just left: ${guild.id} ${guild.name}`);
        // await dbAdapter.removeGuild(guild)
    });
    client.on(Events.ChannelDelete, async (channel) => {
        // await dbAdapter.removeNewsChannel(channel)
    });
    client.on(Events.MessageCreate, async (data) => {
        LoggerHelper.dev(data.content);
        await EventHandler.runEventForGuilds(EventHandler.DiscordEvents.MESSAGE_EVENT);
    });
    client.login(process.env.discord_token).catch(reason => {
        LoggerHelper.info(reason);
    });
}
//# sourceMappingURL=discordbot.js.map