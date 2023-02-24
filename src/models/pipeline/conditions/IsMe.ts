import {TaskResult} from "../TaskResult.js";
import {Condition} from "../Condition.js";

export class IsMe extends Condition {
    name = "IsMe";
    params: Array<string>;

    async exec(...args): Promise<TaskResult> {
        let cond = false
        console.log(`CONDITION ${cond}`)
        return {data: undefined, result: cond}
    }

    // toJson(): any {
    //
    // }

}