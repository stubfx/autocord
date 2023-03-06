import { Task } from "../../Task.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
export class SetStorageValue extends Task {
    name = ChainLinkTypes.Task.SetStorageValue;
    description = 'Increase the counter passed as param';
    acceptParams = [{
            name: "variableName",
            type: ChainLinkTypes.Param.STRING
        }, {
            name: "value",
            type: ChainLinkTypes.Param.STRING
        }];
    async behavior(...args) {
        let valueName = this.getResolvedParam("variableName");
        let value = this.getResolvedParam("value");
        await this.setSharedStorageValue(valueName, value);
        return true;
    }
}
//# sourceMappingURL=SetStorageValue.js.map