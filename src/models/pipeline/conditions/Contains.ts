import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class Contains extends Condition {
    id = ChainLinkTypes.IDs.Condition.Contains;
    name = ChainLinkTypes.IDs.Condition.Contains;

    acceptParams = [{
        name: "text",
        type: ChainLinkTypes.Param.STRING
    }, {
        name: "contains",
        type: ChainLinkTypes.Param.STRING
    }]

    description = "Checks if the given text contains the 'contains' text. Ex 'hello world' contains 'world' " +
        "but does not contain 'wood'."

    async behavior(...args) : Promise<Boolean> {
        let text = this.getResolvedParam("text") || ""
        // do not resolve regex.
        let contains = this.getResolvedParam("contains")
        return !!(text).includes(contains)
    }

}