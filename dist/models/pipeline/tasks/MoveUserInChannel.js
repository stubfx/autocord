import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { PermissionsBitField } from "discord.js";
export class MoveUserInChannel extends Task {
    id = ChainLinkTypes.IDs.Task.MoveUserInChannel;
    name = ChainLinkTypes.IDs.Task.MoveUserInChannel;
    description = 'Move the given user in the given channel.';
    requiredPermissions = [PermissionsBitField.Flags.MoveMembers];
    acceptParams = [{
            name: "channelId",
            type: ChainLinkTypes.Param.CHANNEL_ID
        }, {
            name: "userId",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let channelId = this.getResolvedParam("channelId");
        let userId = this.getResolvedParam("userId");
        let guild = await this.getFetchedGuild();
        let guildMember = await guild.members.fetch(userId);
        let channel = await guild.channels.fetch(channelId);
        await guildMember.voice.setChannel(channel, "Move");
        return true;
    }
}
//# sourceMappingURL=MoveUserInChannel.js.map