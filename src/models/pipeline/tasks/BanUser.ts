import {Task} from "../Task.js";
import {TaskResult} from "../TaskResult.js";

export class BanUser extends Task {
    name = "BanUser";

    async exec(...args): Promise<TaskResult> {
        console.log('BANNING USER!!!')
        return {data: undefined, result: true}
    }

    // toJson(): any {
    //
    // }

}