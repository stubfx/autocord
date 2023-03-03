import { EventLink } from "../EventLink.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class MessageCreate extends EventLink {
    name = ChainLinkTypes.Event.MessageCreate;
    description = "Fired when a user sends a message.";
    exposesArguments = [
        "channelId",
        "userId ",
        "username",
        "messageId",
        "messageContent",
    ];
    async behavior(...args) {
        console.log(this.name);
        return true;
    }
}
//# sourceMappingURL=MessageCreate.js.map