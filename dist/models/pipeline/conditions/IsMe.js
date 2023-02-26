import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class IsMe extends Condition {
    name = ChainLinkTypes.Condition.IsMe;
    params;
    async behavior(...args) {
        let cond = true;
        console.log(`CONDITION ${cond}`);
        return cond;
    }
}
//# sourceMappingURL=IsMe.js.map