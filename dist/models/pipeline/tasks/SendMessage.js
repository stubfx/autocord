import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;
    async exec(...args) {
        console.log('SENDING MESSAGE!!!');
        return { data: undefined, result: true };
    }
}
//# sourceMappingURL=SendMessage.js.map