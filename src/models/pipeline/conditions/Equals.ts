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
        let op1 = this.getParam("op1")
        let op2 = this.getParam("op2")
        // DOUBLE == IS INTENTIONAL: this module needs to handle endless possibilities.
        return this.resolveStringEmbeds(op1) == this.resolveStringEmbeds(op2)
    }

}