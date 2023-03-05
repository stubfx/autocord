import { EventLink } from "../../EventLink.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
export class OnEveryHour extends EventLink {
    name = ChainLinkTypes.Event.onEveryHour;
    description = "Fired once every hour. Not super accurate.";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=OnEveryHour.js.map