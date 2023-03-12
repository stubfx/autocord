import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import Discord, { PermissionsBitField } from "discord.js";
export class CreateChannel extends Task {
    id = ChainLinkTypes.IDs.Task.CreateChannel;
    name = ChainLinkTypes.IDs.Task.CreateChannel;
    description = 'Creates a new channel.';
    exposesArguments = ['newChannelId'];
    requiredPermissions = [PermissionsBitField.Flags.ManageChannels];
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
        let type = this.getParam("type");
        let name = this.getResolvedParam("name");
        let guild = await this.getFetchedGuild();
        let channel = await guild.channels.create({ name: name, type: +type, parent: category });
        // @ts-ignore
        this.setStorageParam('newChannelId', channel.id);
        return true;
    }
}
//# sourceMappingURL=CreateChannel.js.map