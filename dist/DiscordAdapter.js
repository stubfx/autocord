import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import * as LoggerHelper from "./loggerHelper.js";
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
        const result = await rest.get(route, {
            authPrefix: "Bearer"
        });
        return result;
    }
    async getUserInfo() {
        return await this.get(Routes.user('@me'));
    }
    async getUserOwnedGuilds() {
        return (await this.get(Routes.userGuilds())).filter(value => value.owner);
    }
    async checkServer(guildId) {
        let guild = null;
        try {
            guild = await client.guilds.fetch(guildId);
        }
        catch (e) {
            LoggerHelper.error(e);
        }
        return !!guild;
    }
}
//# sourceMappingURL=DiscordAdapter.js.map