import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class DeleteChannel extends Task {
    name = ChainLinkTypes.Task.DeleteChannel;
    description = 'Deletes a channel by the given id.';
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