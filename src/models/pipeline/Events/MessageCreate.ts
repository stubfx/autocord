import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MessageCreate extends EventLink {
    id = ChainLinkTypes.IDs.Event.MessageCreate;
    name = ChainLinkTypes.IDs.Event.MessageCreate;
    description = "Fired when a user sends a message."

    exposesArguments = [
        "channelId",
        "userId",
        "username",
        "messageId",
        "messageContent",
    ]

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

}