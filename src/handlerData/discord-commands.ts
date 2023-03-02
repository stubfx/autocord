import {ChatInputCommandInteraction, Client, PermissionsBitField, SlashCommandBuilder,} from "discord.js";

/**
 *
 @type {Array<{public: boolean, data: SlashCommandBuilder, execute(Client, ChatInputCommandInteraction): Promise<void>}>}
 */
const commands = [{
    public: true,
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription("HEEEEEEELP")
        .setDefaultMemberPermissions(PermissionsBitField.All),
    // .setDefaultMemberPermissions(PermissionsBitField.Default),
    async execute(client, interaction) {
        // inside a command, event listener, etc.
        await interaction.reply({
            content: "Open your dashboard here!\nhttps://autocord.io", ephemeral: true
        });
    }
}]
export default commands;