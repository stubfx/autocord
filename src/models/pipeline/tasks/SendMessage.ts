import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;

    acceptParams = ["channelId", "message"]

    async behavior(...args) : Promise<Boolean> {
        let message = this.getParam("message");
        console.log(this.resolveStringEmbeds(message))
        return true
    }

}