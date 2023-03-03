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
        let category = this.getResolvedParam("category");
        let type = this.getResolvedParam("type");
        let name = this.getResolvedParam("name");
        let guild = await this.fetchedGuild();
        await guild.channels.create({ name: name, type: +type, parent: category });
        return true;
    }
}
//# sourceMappingURL=DeleteChannel.js.map