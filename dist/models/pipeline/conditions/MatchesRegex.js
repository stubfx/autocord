import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class MatchesRegex extends Condition {
    id = ChainLinkTypes.IDs.Condition.MatchesRegex;
    name = ChainLinkTypes.IDs.Condition.MatchesRegex;
    acceptParams = [{
            name: "text",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "regex",
            type: ChainLinkTypes.Param.REGEX
        }];
    description = "Checks if the given text matches a regex. The regex input must be treated as a string, " +
        "as it will be used in a match function. Find more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions";
    async behavior(...args) {
        let text = this.getResolvedParam("text") || "";
        // do not resolve regex.
        let regex = this.getParam("regex");
        return !!(text).match(regex);
    }
}
//# sourceMappingURL=MatchesRegex.js.map