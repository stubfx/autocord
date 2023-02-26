import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MessageReactionAdd extends EventLink {
    name = ChainLinkTypes.Event.MessageReactionAdd;

    description = "Fired when a user adds a reaction to a message"

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

    // toJson(): any {
    //
    // }

}