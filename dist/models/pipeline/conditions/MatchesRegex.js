import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class MatchesRegex extends Condition {
    name = ChainLinkTypes.Condition.MatchesRegex;
    acceptParams = [{
            name: "text",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "regex",
            type: ChainLinkTypes.Param.REGEX
        }];
    description = "Checks if the given text matches a regex";
    async behavior(...args) {
        let text = this.getResolvedParam("text") || "";
        // do not resolve regex.
        let regex = this.getParam("regex");
        return !!(text).match(regex);
    }
}
//# sourceMappingURL=MatchesRegex.js.map