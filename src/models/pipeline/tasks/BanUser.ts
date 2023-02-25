import {Task} from "../Task.js";
import {TaskResult} from "../TaskResult.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class BanUser extends Task {
    name = ChainLinkTypes.Task.BanUser;

    async exec(...args): Promise<TaskResult> {
        console.log('BANNING USER!!!')
        return {data: undefined, result: true}
    }

    // toJson(): any {
    //
    // }

}