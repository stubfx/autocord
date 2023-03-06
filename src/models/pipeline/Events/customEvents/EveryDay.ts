import {EventLink} from "../../EventLink.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class EveryDay extends EventLink {
    name = ChainLinkTypes.Event.EveryDay;

    description = "Fired once every day."

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }
}