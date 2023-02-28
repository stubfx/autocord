import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MatchesRegex extends Condition {
    name = ChainLinkTypes.Condition.MatchesRegex;

    acceptParams = [{
        name: "text",
        type: ChainLinkTypes.Param.STRING
    }, {
        name: "regex",
        type: ChainLinkTypes.Param.STRING
    }]

    description = "Checks if the given text matches a regex"

    async behavior(...args) : Promise<Boolean> {
        let text = this.getParam("text") || ""
        let regex = this.getParam("regex")
        return !!(this.resolveStringEmbeds(text)).match(regex)
    }

}