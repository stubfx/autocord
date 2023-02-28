/**
 *
 @type {Array<{public: boolean, data: SlashCommandBuilder, execute(Client, ChatInputCommandInteraction): Promise<void>}>}
 */
const commands = [ /*{
    public: true,
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription("News setup command")
        // server admin should handle this instead?
        .setDefaultMemberPermissions(PermissionsBitField.Default)
        .addSubcommand(subcommandGroup => subcommandGroup
            .setName("add")
            .setDescription("Add an TheJournalino job to this channel")
            .addStringOption(builder => builder
                .setName("topic")
                .setDescription("The topic you want the news for")
                .addChoices(...getTopicDataAsCommandChoices())
                .setRequired(true)
            )
            .addStringOption(builder => builder
                .setName("language")
                .setDescription("The languages you want to receive the news in")
                .addChoices(...languages)
                .setRequired(true)
            )
        ).addSubcommand(subcommandGroup => subcommandGroup
            .setName("remove")
            .setDescription("Remove an TheJournalino job to this channel")
            .addStringOption(builder => builder
                .setName("topic")
                .setDescription("The topic you want the news for")
                .addChoices({name: "All", value: "all"}, ...getTopicDataAsCommandChoices())
                .setRequired(true)
            )
        ),
    // .setDefaultMemberPermissions(PermissionsBitField.Default),
    async execute(client, interaction) {
        let subcommand = interaction.options.getSubcommand();
        if (subcommand === "add") {
            await addNewsChannelInteraction(interaction);
        } else if (subcommand === "remove") {
            await removeNewsChannelInteraction(interaction);
        }
    }
}, {
    public: true,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("HEEEEEEELP"),
    // server admin should handle this instead?
    // .setDefaultMemberPermissions(PermissionsBitField.All),
    // .setDefaultMemberPermissions(PermissionsBitField.Default),
    async execute(client, interaction) {
        // inside a command, event listener, etc.
        await interaction.reply({
            content: "Here you can find some help " +
                "(assuming that i remember to keep it up to date)\nhttps://thejournalino.com/help", ephemeral: false
        });
    }
}*/];
export default commands;
//# sourceMappingURL=discord-commands.js.map