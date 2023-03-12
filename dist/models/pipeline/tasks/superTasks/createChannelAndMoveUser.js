import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
import Discord, { PermissionsBitField } from "discord.js";
import { SuperTask } from "../../SuperTask.js";
export class CreateChannelAndMoveUser extends SuperTask {
    id = ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser;
    name = ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser;
    description = 'Works with VoiceStateUpdate';
    cost = 5;
    requiredPermissions = [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.MoveMembers];
    acceptParams = [{
            name: "channelToJoin",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }, {
            name: "category",
            type: ChainLinkTypes.Param.CATEGORY_ID
        }, {
            name: "name",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let channelToJoin = this.getResolvedParam("channelToJoin");
        if (channelToJoin !== this.getStoreValue('channelId')) {
            // wrong channel.
            return false;
        }
        let categoryId = this.getResolvedParam("category");
        let name = this.getResolvedParam("name");
        let userId = this.getStoreValue('userId');
        let guild = await this.getFetchedGuild();
        let fCategory = await guild.channels.fetch(categoryId);
        let catChannels = fCategory.children.cache.size < 50;
        if (!catChannels) {
            // cap reached. 50 is maximum.
            return false;
        }
        let channel = await guild.channels.create({ name: name, type: Discord.ChannelType.GuildVoice, parent: categoryId });
        let fetchedUser = guild.members.cache.find(value => value.id === userId);
        await fetchedUser.voice.setChannel(channel, "Move");
        return true;
    }
}
//# sourceMappingURL=createChannelAndMoveUser.js.map