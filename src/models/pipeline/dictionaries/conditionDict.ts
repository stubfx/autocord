import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {Equals} from "../conditions/Equals.js";
import {MatchesRegex} from "../conditions/MatchesRegex.js";
import {Random} from "../conditions/Random.js";
import {Contains} from "../conditions/Contains.js";
import {ChainLink} from "../chain/ChainLink.js";
import {UnknownChainLink} from "../chain/UnknownChainLink.js";

export class ConditionDict {

    getById(id: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        switch (id) {
            case ChainLinkTypes.IDs.Condition.Equals:
                return new Equals(params)
            case ChainLinkTypes.IDs.Condition.MatchesRegex:
                return new MatchesRegex(params)
            case ChainLinkTypes.IDs.Condition.Random:
                return new Random(params)
            case ChainLinkTypes.IDs.Condition.Contains:
                return new Contains(params)
            default:
                return new UnknownChainLink()
        }
    }

}