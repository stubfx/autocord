import { EventLink } from "../EventLink.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class VoiceStateUpdate extends EventLink {
    name = ChainLinkTypes.Event.VoiceStateUpdate;
    description = "Fired when a user joins a channel";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=VoiceStateUpdate.js.map