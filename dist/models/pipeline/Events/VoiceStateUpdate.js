import { EventLink } from "../EventLink.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class VoiceStateUpdate extends EventLink {
    id = ChainLinkTypes.IDs.Event.VoiceStateUpdate;
    name = ChainLinkTypes.IDs.Event.VoiceStateUpdate;
    description = "Fired when voice channel updates.";
    exposesArguments = [
        'channelId',
        'channelName',
        'userId',
        'username',
        'memberCount',
        'action',
        'oldChannelMemberCount'
    ];
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=VoiceStateUpdate.js.map