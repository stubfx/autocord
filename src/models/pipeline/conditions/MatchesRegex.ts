import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class MatchesRegex extends Condition {
    name = ChainLinkTypes.Condition.MatchesRegex;

    acceptParams = ["Text", "Regex"]

    description = "Checks if the given text matches a regex"

    async behavior(...args) : Promise<Boolean> {
        let text = this.getParam("Text") || ""
        let regex = this.getParam("Regex")
        let cond = !!(this.resolveStringEmbeds(text)).match(regex)
        console.log(`CONDITION ${cond}`)
        return cond
    }

}