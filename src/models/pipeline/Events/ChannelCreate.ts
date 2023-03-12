import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class ChannelCreate extends EventLink {
    readonly id: ChainLinkTypes.IDs.Event.ChannelCreate;
    name = ChainLinkTypes.IDs.Event.ChannelCreate;

    description = "Fired when a new channel gets created"

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

    // toJson(): any {
    //
    // }

}