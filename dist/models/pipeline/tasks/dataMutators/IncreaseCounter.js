import { Task } from "../../Task.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
export class IncreaseCounter extends Task {
    id = ChainLinkTypes.IDs.Task.IncreaseStorageCounter;
    name = ChainLinkTypes.IDs.Task.IncreaseStorageCounter;
    description = 'Increase the counter passed as param';
    acceptParams = [{
            name: "counterName",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let counterName = this.getResolvedParam("counterName");
        await this.increaseStorageCounter(counterName);
        return true;
    }
}
//# sourceMappingURL=IncreaseCounter.js.map