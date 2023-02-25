import {TaskResult} from "../TaskResult.js";
import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class IsMe extends Condition {
    name = ChainLinkTypes.Condition.IsMe;
    params: Array<string>;

    async exec(...args): Promise<TaskResult> {
        let cond = true
        console.log(`CONDITION ${cond}`)
        return {data: undefined, result: cond}
    }

    // toJson(): any {
    //
    // }

}