import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class IsMe extends Condition {
    name = ChainLinkTypes.Condition.IsMe;

    async behavior(...args) : Promise<Boolean> {
        let cond = true
        console.log(`CONDITION ${cond}`)
        return cond
    }

}