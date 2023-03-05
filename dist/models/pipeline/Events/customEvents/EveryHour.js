import { EventLink } from "../../EventLink.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
export class EveryHour extends EventLink {
    name = ChainLinkTypes.Event.EveryHour;
    description = "Fired once every hour. Not super accurate.";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=EveryHour.js.map