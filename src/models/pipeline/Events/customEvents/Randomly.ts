import {EventLink} from "../../EventLink.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class Randomly extends EventLink {
    readonly id: ChainLinkTypes.Event;
    name = ChainLinkTypes.IDs.Event.Randomly;

    description = "Fired randomly i guess?"

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }
}