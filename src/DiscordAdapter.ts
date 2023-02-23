import fetch from "node-fetch";
import Discord, {REST, RouteLike} from "discord.js";
import {Routes} from "discord-api-types/v10";
import * as LoggerHelper from "./loggerHelper.js";

let client = null

export function init(discordClient: Discord.Client) {
    client = discordClient
}


export class DiscordAdapter {
    private readonly bearerToken: string;

    constructor(bearerToken: string = null) {
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

    async checkServer(guildId: string) : Promise<boolean> {
        let guild = null
        try {
            guild = await client.guilds.fetch(guildId)
        } catch (e) {
            LoggerHelper.error(e)
        }
        return !!guild
    }
}