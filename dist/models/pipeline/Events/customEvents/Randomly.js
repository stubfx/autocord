import { EventLink } from "../../EventLink.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
export class Randomly extends EventLink {
    name = ChainLinkTypes.Event.Randomly;
    description = "Fired randomly i guess?";
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=Randomly.js.map