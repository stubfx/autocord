import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;
    async behavior(...args) : Promise<Boolean> {
        console.log('SENDING MESSAGE!!!')
        return true
    }

}