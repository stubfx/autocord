import {Task} from "../Task.js";
import {TaskResult} from "../TaskResult.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;
    async exec(...args): Promise<TaskResult> {
        console.log('SENDING MESSAGE!!!')
        return {data: undefined, result: true}
    }

}