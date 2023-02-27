import { Condition } from "../Condition.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class MatchesRegex extends Condition {
    name = ChainLinkTypes.Condition.MatchesRegex;
    acceptParams = ["Text", "Regex"];
    description = "Checks if the given text matches a regex";
    async behavior(...args) {
        let text = this.getParam("Text") || "";
        let regex = this.getParam("Regex");
        return !!(this.resolveStringEmbeds(text)).match(regex);
    }
}
//# sourceMappingURL=MatchesRegex.js.map