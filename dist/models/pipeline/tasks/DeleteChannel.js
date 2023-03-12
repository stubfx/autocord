import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { PermissionsBitField } from "discord.js";
export class DeleteChannel extends Task {
    id = ChainLinkTypes.IDs.Task.DeleteChannel;
    name = ChainLinkTypes.IDs.Task.DeleteChannel;
    description = 'Deletes a channel by the given id.';
    requiredPermissions = [PermissionsBitField.Flags.ManageChannels];
    acceptParams = [{
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }];
    async behavior(...args) {
        let channel = this.getResolvedParam("channelId");
        let guild = await this.getFetchedGuild();
        let fetchedChannel = guild.channels.cache.get(channel);
        if (fetchedChannel) {
            await fetchedChannel.delete("");
        }
        return true;
    }
}
//# sourceMappingURL=DeleteChannel.js.map