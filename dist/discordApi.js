import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
export class DiscordApi {
    bearerToken;
    constructor(bearerToken) {
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
        return await this.get(Routes.userGuilds());
    }
}
//# sourceMappingURL=discordApi.js.map