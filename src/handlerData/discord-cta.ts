import {BaseInteraction, ButtonInteraction, Client} from "discord.js";

/**
 *
 * @type {[{name: String, execute(Client, BaseInteraction | ButtonInteraction): Promise<void>}]}
 */
const discordCTAs = [{
    name: "gamingnews_cta_1",
    async execute(client, interaction) {

        await interaction.update({
            content: 'Aight! News will be here soon!',
            components: []});
    }
}]
export default discordCTAs;