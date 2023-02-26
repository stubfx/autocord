import {Event} from "../Event.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam";

export class MessageCreate extends Event {
    name = ChainLinkTypes.Event.MessageCreate;

    params: Array<ChainLinkParam> = [{
        name: this.name,
        description: "Fired when a user sends a message.",
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