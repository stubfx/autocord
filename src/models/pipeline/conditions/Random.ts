import {Condition} from "../Condition.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class Random extends Condition {
    readonly id: ChainLinkTypes.IDs.Condition.Random;
    name = ChainLinkTypes.IDs.Condition.Random;

    description = 'Has a certain percentage of probabilities to pass the test.'

    acceptParams = [{
        name: "percentage",
        description: 'A number from 0 to 100.',
        type: ChainLinkTypes.Param.NUMBER
    }]

    async behavior(...args) : Promise<Boolean> {
        let percentage = this.getResolvedParam("percentage")
        let test = Math.random() > (+percentage/100);
        console.log(test)
        return test
    }

}