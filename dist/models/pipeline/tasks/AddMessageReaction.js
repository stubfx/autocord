import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { discordClient } from "../../../discordbot.js";
import { PermissionsBitField } from "discord.js";
export class AddMessageReaction extends Task {
    id = ChainLinkTypes.IDs.Task.AddMessageReaction;
    name = ChainLinkTypes.IDs.Task.AddMessageReaction;
    description = 'Adds a reaction to the given message';
    requiredPermissions = [PermissionsBitField.Flags.AddReactions];
    acceptParams = [{
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }, {
            name: "messageId",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "emojiName",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let channelId = this.getResolvedParam("channelId");
        let messageId = this.getResolvedParam("messageId");
        let emojiName = this.getResolvedParam("emojiName");
        let guild = await discordClient.guilds.fetch(this.guild.guildId);
        let channel = await guild.channels.fetch(channelId);
        let message = await channel.messages.fetch(messageId);
        await message.react(emojiName);
        return true;
    }
}
//# sourceMappingURL=AddMessageReaction.js.map