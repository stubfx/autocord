import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class IsMe extends Condition {
    name = ChainLinkTypes.Condition.IsMe;
    params;
    async exec(...args) {
        let cond = true;
        console.log(`CONDITION ${cond}`);
        return { data: undefined, result: cond };
    }
}
//# sourceMappingURL=IsMe.js.map