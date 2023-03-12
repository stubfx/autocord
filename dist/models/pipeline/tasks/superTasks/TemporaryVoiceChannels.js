import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
import Discord, { PermissionsBitField } from "discord.js";
import { SuperTask } from "../../SuperTask.js";
export class TemporaryVoiceChannels extends SuperTask {
    id = ChainLinkTypes.IDs.SuperTask.TemporaryVoiceChannels;
    name = ChainLinkTypes.IDs.SuperTask.TemporaryVoiceChannels;
    description = 'Works with VoiceStateUpdate, regroups the tasks:' +
        `${ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser}, ${ChainLinkTypes.IDs.SuperTask.DeleteChannelOnUserLeave}`;
    cost = 8;
    requiredPermissions = [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.MoveMembers];
    acceptParams = [{
            name: "channelToJoin",
            type: ChainLinkTypes.Param.CHANNEL_ID,
            description: "Id of the channel the user should join to trigger this task"
        }, {
            name: "category",
            type: ChainLinkTypes.Param.CATEGORY_ID,
            description: "Category in which temporary channels will be created"
        }, {
            name: "name",
            type: ChainLinkTypes.Param.STRING,
            description: "Name of the temporary channels"
        }];
    async behavior(...args) {
        // handle creation
        let create = await this.createChannelAndMoveUser();
        if (!create) {
            // try delete
            return await this.deleteChannelOnUserLeave();
        }
    }
    async deleteChannelOnUserLeave() {
        let oldVoiceState = this.vault['oldVoiceState'];
        if (oldVoiceState) {
            let channel = oldVoiceState.channel;
            if (channel) {
                let channelName = channel.name;
                let name = this.getResolvedParam("name");
                if (channelName.includes(name)) {
                    // is this voice?
                    if (channel.members.size === 0) {
                        // delete it!
                        await channel.delete('Delete');
                        return true;
                    }
                }
            }
        }
        return false;
    }
    async createChannelAndMoveUser() {
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
//# sourceMappingURL=TemporaryVoiceChannels.js.map