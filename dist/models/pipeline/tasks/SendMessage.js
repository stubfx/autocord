import { Task } from "../Task.js";
export class SendMessage extends Task {
    name = "SendMessage";
    async exec(...args) {
        console.log('SENDING MESSAGE!!!');
        return { data: undefined, result: true };
    }
}
//# sourceMappingURL=SendMessage.js.map