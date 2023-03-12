import {EventLink} from "../../EventLink.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class Randomly extends EventLink {
    id = ChainLinkTypes.IDs.Event.Randomly;
    name = ChainLinkTypes.IDs.Event.Randomly;

    description = "Fired randomly i guess?"

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }
}