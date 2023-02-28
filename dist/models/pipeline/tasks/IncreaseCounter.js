import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { increaseStorageCounter } from "../../../dbAdapter.js";
export class IncreaseCounter extends Task {
    name = ChainLinkTypes.Task.IncreaseCounter;
    acceptParams = ["counterName"];
    async behavior(...args) {
        let counterName = this.getParam("counterName");
        // increase locally as well!
        this.increaseStorageCounter(counterName);
        await increaseStorageCounter(this.guild.storage.id, counterName);
        return true;
    }
}
//# sourceMappingURL=IncreaseCounter.js.map