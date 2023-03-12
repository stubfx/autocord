import {EventLink} from "../../EventLink.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class EveryHour extends EventLink {
    id = ChainLinkTypes.IDs.Event.EveryHour;
    name = ChainLinkTypes.IDs.Event.EveryHour;

    description = "Fired once every hour."

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }
}