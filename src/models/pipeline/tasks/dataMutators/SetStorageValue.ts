import {Task} from "../../Task.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class SetStorageValue extends Task {
    name = ChainLinkTypes.Task.SetStorageValue;

    description = 'Increase the counter passed as param'

    acceptParams = [{
        name: "variableName",
        type: ChainLinkTypes.Param.STRING
    },{
        name: "value",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args) : Promise<Boolean> {
        let valueName = this.getResolvedParam("variableName");
        let value = this.getResolvedParam("value");
        await this.setStorageValue(valueName, value)
        return true
    }

}