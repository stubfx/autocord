import { ButtonInteraction, ChatInputCommandInteraction, Collection, Events, REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import discordCommands from "./handlerData/discord-commands.js";
import discordCTAs from "./handlerData/discord-cta.js";
import * as LoggerHelper from "./loggerHelper.js";
const commands = new Collection();
const restCommands = [];
const restCommandsForAdminGuild = [];
for (const rawCommand of discordCommands) {
    // const filePath = path.join(commandsPath, file);
    // const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in rawCommand && 'execute' in rawCommand) {
        if (rawCommand.public) {
            restCommands.push(rawCommand.data.toJSON());
        }
        else {
            // in this case the command is restricted only to me.
            restCommandsForAdminGuild.push(rawCommand.data.toJSON());
        }
        commands.set(rawCommand.data.name, rawCommand);
    }
    else {
        // LoggerHelper.info(`[WARNING] The command at ${} is missing a required "data" or "execute" property.`);
        LoggerHelper.error("Error importing command");
    }
}
export default async function updateCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.discord_token);
    try {
        LoggerHelper.dev(`Started refreshing application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
        // Routes.applicationGuildCommands(process.env.discord_application_id, guild.id),
        // for all guilds.
        // Routes.applicationCommands(process.env.discord_application_id, {body}),
        Routes.applicationCommands(process.env.discord_application_id), { body: restCommands });
        // The put method is used to fully refresh all commands in the guild with the current set
        const dataRestricted = await rest.put(
        // Routes.applicationCommands(process.env.discord_application_id, {body}),
        Routes.applicationGuildCommands(process.env.discord_application_id, process.env.discord_admin_guild), { body: restCommandsForAdminGuild });
        // @ts-ignore
        LoggerHelper.info(`Successfully reloaded ${data.length} application (/) commands.`);
        // @ts-ignore
        LoggerHelper.info(`Successfully reloaded ${dataRestricted.length} admin application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        LoggerHelper.error(error);
    }
    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction instanceof ButtonInteraction) {
            // check in the ctas!
            let cta = discordCTAs.find(value => value.name === interaction.customId);
            await cta.execute(client, interaction);
        }
        else if (interaction instanceof ChatInputCommandInteraction) {
            const command = commands.get(interaction.commandName);
            if (!command) {
                LoggerHelper.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                // @ts-ignore
                await command.execute(client, interaction);
            }
            catch (error) {
                LoggerHelper.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
}
//# sourceMappingURL=commandHandler.js.map