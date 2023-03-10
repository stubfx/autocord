import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {Equals} from "../conditions/Equals.js";
import {MatchesRegex} from "../conditions/MatchesRegex.js";
import {Random} from "../conditions/Random.js";
import {Contains} from "../conditions/Contains.js";

export class ConditionDict {

    getConditionByName(chainLinkConditionName: string, params: ChainLinkParam[] = []) : Condition {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.Equals:
                return new Equals(params)
            case ChainLinkTypes.Condition.MatchesRegex:
                return new MatchesRegex(params)
            case ChainLinkTypes.Condition.Random:
                return new Random(params)
            case ChainLinkTypes.Condition.Contains:
                return new Contains(params)
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`)
        }
    }

}