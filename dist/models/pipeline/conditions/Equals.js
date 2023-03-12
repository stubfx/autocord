import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class Equals extends Condition {
    id = ChainLinkTypes.IDs.Condition.Equals;
    name = ChainLinkTypes.IDs.Condition.Equals;
    description = 'Checks if op1 = op2';
    acceptParams = [{
            name: "op1",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "op2",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let op1 = this.getResolvedParam("op1");
        let op2 = this.getResolvedParam("op2");
        // DOUBLE == IS INTENTIONAL: this module needs to handle endless possibilities.
        return op1 == op2;
    }
}
//# sourceMappingURL=Equals.js.map