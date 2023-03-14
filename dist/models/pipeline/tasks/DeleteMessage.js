import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { discordClient } from "../../../discordbot.js";
import { PermissionsBitField } from "discord.js";
export class DeleteMessage extends Task {
    id = ChainLinkTypes.IDs.Task.DeleteMessage;
    name = ChainLinkTypes.IDs.Task.DeleteMessage;
    description = 'Delete a message by the given messageID';
    requiredPermissions = [PermissionsBitField.Flags.ManageMessages];
    acceptParams = [{
            name: "messageId",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }];
    async behavior(...args) {
        let channelId = this.getResolvedParam("channelId");
        let messageId = this.getResolvedParam("messageId");
        discordClient.channels.fetch(channelId)
            .then(async (channel) => {
            let textChannel = channel;
            if (textChannel.messages) {
                let message = await textChannel.messages.fetch(messageId);
                if (message) {
                    await message.delete();
                }
            }
        }).catch(async () => {
        });
        return true;
    }
}
//# sourceMappingURL=DeleteMessage.js.map