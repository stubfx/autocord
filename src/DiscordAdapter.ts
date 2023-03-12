import Discord, {PermissionsBitField, REST, RouteLike, SlashCommandBuilder} from "discord.js";
import {Routes} from "discord-api-types/v10";
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
        // include admins
        let userGuilds = await this.get(Routes.userGuilds()) as Array<PartialGuild>;
        // @ts-ignore
        return userGuilds.filter(value => new Discord.PermissionsBitField(value.permissions).has(PermissionsBitField.Flags.Administrator))
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
            // save this from the console.
            // LoggerHelper.consoleError(e)
        }
        return !!guild
    }

    updateAllGuildCommands() {

    }

    static async updateCommandsForGuild(guildId: string, commands: string[]) {
        let slashCommands = []
        for (let command of commands) {
            slashCommands.push(new SlashCommandBuilder()
                .setName(command)
                .setDescription("CustomCommand")
                .setDefaultMemberPermissions(0))
        }
        const rest = new REST({version: '10'}).setToken(process.env.discord_token);
        await rest.put(
            // Routes.applicationCommands(process.env.discord_application_id, {body}),
            Routes.applicationGuildCommands(process.env.discord_application_id, guildId),
            {body: slashCommands},
        );
    }
}