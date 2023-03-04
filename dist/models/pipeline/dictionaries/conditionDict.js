import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { Equals } from "../conditions/Equals.js";
import { MatchesRegex } from "../conditions/MatchesRegex.js";
export class ConditionDict {
    getConditionByName(chainLinkConditionName, params = []) {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.Equals:
                return new Equals(params);
            case ChainLinkTypes.Condition.MatchesRegex:
                return new MatchesRegex(params);
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`);
        }
    }
}
//# sourceMappingURL=conditionDict.js.map