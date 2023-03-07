import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { discordClient } from "../../../discordbot.js";
import { PermissionsBitField } from "discord.js";
export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;
    description = 'Sends a message to the given channel.';
    requiredPermissions = [PermissionsBitField.Flags.SendMessages];
    acceptParams = [{
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }, {
            name: "message",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let channelId = this.getResolvedParam("channelId");
        let message = this.getResolvedParam("message");
        discordClient.channels.fetch(channelId)
            .then(async (channel) => {
            // @ts-ignore
            await channel.send(message);
        }).catch(async () => { });
        return true;
    }
}
//# sourceMappingURL=SendMessage.js.map