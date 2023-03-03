import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { Equals } from "./Equals.js";
import { MatchesRegex } from "./MatchesRegex.js";
export const condDict = [{
        name: ChainLinkTypes.Condition.Equals,
        Clazz: Equals
    }, {
        name: ChainLinkTypes.Condition.MatchesRegex,
        Clazz: MatchesRegex
    }];
//# sourceMappingURL=conditionDict.js.map