import { EventLink } from "../EventLink.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class ChannelCreate extends EventLink {
    name = ChainLinkTypes.Event.ChannelCreate;
    description = "Fired when a new channel gets created";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=ChannelCreate.js.map