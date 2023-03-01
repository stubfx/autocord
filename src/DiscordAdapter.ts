import Discord, {REST, RouteLike} from "discord.js";
import {Routes} from "discord-api-types/v10";
import * as LoggerHelper from "./loggerHelper.js";
import {discordClient} from "./discordbot.js";

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
        return await rest.get(route, {
            authPrefix: "Bearer"
        })
    }

    async getUserInfo() {
        return await this.get(Routes.user('@me')) as UserObject
    }

    async getUserOwnedGuilds() {
        return (await this.get(Routes.userGuilds()) as Array<PartialGuild>).filter(value => value.owner)
    }

    async getGuildChannels(guildId: string) {
        let guild = await discordClient.guilds.fetch(guildId);
        return guild.channels.cache
    }

    async getGuildRoles(guildId: string) {
        let guild = await discordClient.guilds.fetch(guildId);
        return guild.roles.cache
    }

    async checkServer(guildId: string) : Promise<boolean> {
        let guild = null
        try {
            guild = await client.guilds.fetch(guildId)
        } catch (e) {
            LoggerHelper.consoleError(e)
        }
        return !!guild
    }
}