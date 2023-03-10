import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";
import {PermissionsBitField, VoiceState} from "discord.js";
import {SuperTask} from "../../SuperTask.js";

export class DeleteChannelOnUserLeave extends SuperTask {
    name = ChainLinkTypes.SuperTask.DeleteChannelOnUserLeave;

    description = 'Works with VoiceStateUpdate'

    cost = 5

    requiredPermissions = [PermissionsBitField.Flags.ManageChannels]

    acceptParams = [{
        name: "nameContains",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args): Promise<Boolean> {
        let oldVoiceState = this.vault['oldVoiceState'] as VoiceState
        if (oldVoiceState) {
            let nameContains = this.getResolvedParam("nameContains")
            let channel = oldVoiceState.channel;
            if (channel) {
                let channelName = channel.name
                if (channelName.includes(nameContains)) {
                    // is this voice?
                    if (channel.members.size === 0) {
                        // delete it!
                        await channel.delete('Delete')
                        return true
                    }
                }
            }
        }
        return false
    }

    // validate() {
    //     // check if channel id is from the same guild.
    //     super.validate()
    // }

}