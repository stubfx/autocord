import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam";

export class MessageReactionAdd extends EventLink {
    name = ChainLinkTypes.Event.MessageReactionAdd;

    params: Array<ChainLinkParam> = [{
        name: this.name,
        description: "Fired when a user adds a reaction to a message",
        type: ChainLinkTypes.ChainLinkParamType.STRING
    }];

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

    // toJson(): any {
    //
    // }

}