import {Task} from "../Task.js";
import {TaskResult} from "../TaskResult.js";

export class SendMessage extends Task {
    name : string = "SendMessage";
    async exec(...args): Promise<TaskResult> {
        console.log('SENDING MESSAGE!!!')
        return {data: undefined, result: true}
    }

}