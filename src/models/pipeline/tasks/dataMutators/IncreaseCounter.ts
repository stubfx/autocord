import {Task} from "../../Task.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class IncreaseCounter extends Task {
    readonly id: ChainLinkTypes.IDs.Task.IncreaseStorageCounter;
    name = ChainLinkTypes.IDs.Task.IncreaseStorageCounter;

    description = 'Increase the counter passed as param'

    acceptParams = [{
        name: "counterName",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args) : Promise<Boolean> {
        let counterName = this.getResolvedParam("counterName");
        await this.increaseStorageCounter(counterName)
        return true
    }

}