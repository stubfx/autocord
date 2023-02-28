import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class Equals extends Condition {
    name = ChainLinkTypes.Condition.Equals;

    description = 'Checks if op1 = op2'

    acceptParams = [{
        name: "op1",
        type: ChainLinkTypes.Param.STRING
    }, {
        name: "op2",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args) : Promise<Boolean> {
        // stubfx
        let op1 = this.getParam("op1")
        // {{username}}
        let op2 = this.getParam("op2")
        // cond = stubfx === stubfx
        let cond = this.resolveStringEmbeds(op1) === this.resolveStringEmbeds(op2)
        console.log(`CONDITION ${cond}`)
        return cond
    }

}