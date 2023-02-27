import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MessageCreate extends EventLink {
    name = ChainLinkTypes.Event.MessageCreate;
    description = "Fired when a user sends a message."

    // {
    //     userId : data.author.id,
    //     username: data.author.username,
    //     messageContent: data.content
    // }
    exposesArguments = [
        "userId",
        "username",
        "messageContent",
    ]

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

}