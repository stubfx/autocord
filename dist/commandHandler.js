import { ChatInputCommandInteraction, Collection, Events, REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import discordCommands from "./handlerData/discord-commands.js";
import { LoggerHelper } from "./loggerHelper.js";
import { discordClient } from "./discordbot.js";
import * as EventHandler from "./eventLifecycle/EventHandler.js";
import { ChainLinkTypes } from "./models/pipeline/chain/ChainLinkTypes.js";
const commands = new Collection();
const restCommands = [];
for (const rawCommand of discordCommands) {
    // const filePath = path.join(commandsPath, file);
    // const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in rawCommand && 'execute' in rawCommand) {
        restCommands.push(rawCommand.data.toJSON());
        commands.set(rawCommand.data.name, rawCommand);
    }
    else {
        // LoggerHelper.info(`[WARNING] The command at ${} is missing a required "data" or "execute" property.`);
        LoggerHelper.error("Error importing command");
    }
}
export async function init() {
    const rest = new REST({ version: '10' }).setToken(process.env.discord_token);
    try {
        LoggerHelper.dev(`Started refreshing application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        /*const data = */
        await rest.put(
        // Routes.applicationGuildCommands(process.env.discord_application_id, guild.id),
        // for all guilds.
        // Routes.applicationCommands(process.env.discord_application_id, {body}),
        Routes.applicationCommands(process.env.discord_application_id), { body: restCommands });
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        LoggerHelper.error(error);
    }
    discordClient.on(Events.InteractionCreate, async (interaction) => {
        // here if is a button interaction,
        // but we don't have them yet.
        // if (interaction instanceof ButtonInteraction) {
        //     // check in the ctas!
        //     let cta = discordCTAs.find(value => value.name === interaction.customId);
        //     await cta.execute(discordClient, interaction)
        // } else
        if (interaction instanceof ChatInputCommandInteraction) {
            const command = commands.get(interaction.commandName);
            if (command) {
                try {
                    // then it must be a standard command such as "/help" or "/dashboard"
                    // @ts-ignore
                    await command.execute(discordClient, interaction);
                }
                catch (e) {
                    LoggerHelper.error(e);
                }
                return;
            }
            // if command is not found in the list, this means that we need to check for the guilds!
            try {
                // // @ts-ignore
                // await command.execute(client, interaction);
                // await interaction.deferReply()
                await interaction.reply({ content: 'Done!', ephemeral: true });
                await EventHandler.runEventForGuild(interaction.guild.id, ChainLinkTypes.IDs.Event.COMMAND, {
                    username: interaction.user.username,
                    userId: interaction.user.id
                }, { commandName: interaction.commandName });
                // await interaction.followUp({content: 'Done!', ephemeral: true})
            }
            catch (error) {
                LoggerHelper.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
}
//# sourceMappingURL=commandHandler.js.map