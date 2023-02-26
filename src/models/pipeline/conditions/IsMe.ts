import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam";

export class IsMe extends Condition {
    name = ChainLinkTypes.Condition.IsMe;
    params: Array<ChainLinkParam>;

    async behavior(...args) : Promise<Boolean> {
        let cond = true
        console.log(`CONDITION ${cond}`)
        return cond
    }

}