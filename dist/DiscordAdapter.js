import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import * as LoggerHelper from "./loggerHelper.js";
import { discordClient } from "./discordbot.js";
let client = null;
export function init(discordClient) {
    client = discordClient;
}
export class DiscordAdapter {
    bearerToken;
    constructor(bearerToken = null) {
        this.bearerToken = bearerToken;
    }
    async get(route) {
        const rest = new REST({ version: '10' }).setToken(this.bearerToken);
        return await rest.get(route, {
            authPrefix: "Bearer"
        });
    }
    async getUserInfo() {
        return await this.get(Routes.user('@me'));
    }
    async getUserOwnedGuilds() {
        return (await this.get(Routes.userGuilds())).filter(value => value.owner);
    }
    async getGuildChannels(guildId) {
        let guild = await discordClient.guilds.fetch(guildId);
        return guild.channels.cache;
    }
    async getGuildRoles(guildId) {
        let guild = await discordClient.guilds.fetch(guildId);
        return guild.roles.cache;
    }
    async checkServer(guildId) {
        let guild = null;
        try {
            guild = await client.guilds.fetch(guildId);
        }
        catch (e) {
            LoggerHelper.consoleError(e);
        }
        return !!guild;
    }
}
//# sourceMappingURL=DiscordAdapter.js.map