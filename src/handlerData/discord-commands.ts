import {ChatInputCommandInteraction, Client, PermissionsBitField, SlashCommandBuilder,} from "discord.js";

/**
 *
 @type {Array<{public: boolean, data: SlashCommandBuilder, execute(Client, ChatInputCommandInteraction): Promise<void>}>}
 */
const commands = [{
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription("dashboard")
        .setDefaultMemberPermissions(PermissionsBitField.All),
    // .setDefaultMemberPermissions(PermissionsBitField.Default),
    async execute(client, interaction) {
        // inside a command, event listener, etc.
        await interaction.reply({
            content: "Open your dashboard here!\nhttps://autocord.io", ephemeral: true
        });
    }
}, {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Need some help?")
        .setDefaultMemberPermissions(PermissionsBitField.All),
    // .setDefaultMemberPermissions(PermissionsBitField.Default),
    async execute(client, interaction) {
        // inside a command, event listener, etc.
        await interaction.reply({
            content: "Need some help?\nJoin our support server here!\nhttps://discord.gg/BpNcVFN7Yr", ephemeral: true
        });
    }
}]
export default commands;