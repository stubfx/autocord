import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { OperationName, OperationsCache } from "../../../cacheSystem/OperationsCache.js";
export class UpdateChannel extends Task {
    name = ChainLinkTypes.Task.UpdateChannel;
    description = 'Updates channel name. By Discord design (after api v11) ' +
        'this can be edited only twice every 10 mins.';
    acceptParams = [{
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }, {
            name: "name",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let channelId = this.getResolvedParam("channelId");
        let name = this.getResolvedParam("name");
        let guild = await this.getFetchedGuild();
        let channel = await guild.channels.fetch(channelId);
        // By Discord design (after api v11) this can be edited only twice every 10 mins.
        await OperationsCache.runIfNotLimited(this.guild.guildId, OperationName.DISCORD_CHANNEL_SETNAME, async () => {
            await channel.setName(name);
        });
        // @ts-ignore
        this.setStorageParam('newChannelId', channel.id);
        return true;
    }
}
//# sourceMappingURL=UpdateChannel.js.map