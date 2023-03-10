import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class Contains extends Condition {
    name = ChainLinkTypes.Condition.Contains;
    acceptParams = [{
            name: "text",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "contains",
            type: ChainLinkTypes.Param.STRING
        }];
    description = "Checks if the given text matches a regex";
    async behavior(...args) {
        let text = this.getResolvedParam("text") || "";
        // do not resolve regex.
        let contains = this.getResolvedParam("contains");
        return !!(text).includes(contains);
    }
}
//# sourceMappingURL=Contains.js.map