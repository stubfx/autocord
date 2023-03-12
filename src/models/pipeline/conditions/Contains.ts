import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class Contains extends Condition {
    readonly id: ChainLinkTypes.IDs.Condition.Contains;
    name = ChainLinkTypes.IDs.Condition.Contains;

    acceptParams = [{
        name: "text",
        type: ChainLinkTypes.Param.STRING
    }, {
        name: "contains",
        type: ChainLinkTypes.Param.STRING
    }]

    description = "Checks if the given text matches a regex"

    async behavior(...args) : Promise<Boolean> {
        let text = this.getResolvedParam("text") || ""
        // do not resolve regex.
        let contains = this.getResolvedParam("contains")
        return !!(text).includes(contains)
    }

}