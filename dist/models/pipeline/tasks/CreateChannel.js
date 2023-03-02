import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import Discord from "discord.js";
export class CreateChannel extends Task {
    name = ChainLinkTypes.Task.CreateChannel;
    description = 'Creates a new channel.';
    acceptParams = [{
            name: "category",
            type: ChainLinkTypes.Param.CATEGORY_ID
        }, {
            name: "type",
            type: ChainLinkTypes.Param.CHANNEL_TYPE,
            options: [{
                    name: 'TEXT',
                    value: Discord.ChannelType.GuildText
                }, {
                    name: 'VOICE',
                    value: Discord.ChannelType.GuildVoice
                }]
        }, {
            name: "name",
            type: ChainLinkTypes.Param.STRING
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
//# sourceMappingURL=CreateChannel.js.map