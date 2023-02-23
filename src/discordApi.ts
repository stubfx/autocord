import fetch from "node-fetch";
import {REST, RouteLike} from "discord.js";
import {Routes} from "discord-api-types/v10";

export class DiscordApi {
    private readonly bearerToken: string;

    constructor(bearerToken: string) {
        this.bearerToken = bearerToken
    }

    async get(route: RouteLike) {
        const rest = new REST({version: '10'}).setToken(this.bearerToken);
        const result = await rest.get(route, {
            authPrefix: "Bearer"
        });
        return result
    }

    async getUserInfo() {
        return await this.get(Routes.user('@me')) as UserObject
    }

    async getUserOwnedGuilds() {
        return await this.get(Routes.userGuilds()) as Array<PartialGuild>
    }
}