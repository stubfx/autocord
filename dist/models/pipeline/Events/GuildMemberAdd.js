import { EventLink } from "../EventLink.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class GuildMemberAdd extends EventLink {
    name = ChainLinkTypes.Event.GuildMemberAdd;
    description = "Fired when a user joins a guild";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=GuildMemberAdd.js.map