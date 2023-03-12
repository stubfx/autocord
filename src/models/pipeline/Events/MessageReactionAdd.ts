import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MessageReactionAdd extends EventLink {
    id = ChainLinkTypes.IDs.Event.MessageReactionAdd;
    name = ChainLinkTypes.IDs.Event.MessageReactionAdd;

    // {
    //     userId : user.id,
    //     username: user.username,
    //     emojiName: data.emoji.name
    // }
    exposesArguments = [
        "userId",
        "username",
        "emojiName",
    ]

    description = "Fired when a user adds a reaction to a message"

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

}