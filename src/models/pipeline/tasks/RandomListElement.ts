import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {rndArrayItem} from "../../../utils.js";

export class RandomListElement extends Task {
    name = ChainLinkTypes.Task.RandomListElement;

    description = 'Returns a random value from a list of given items.'

    acceptParams = [{
        name: "list",
        type: ChainLinkTypes.Param.LIST
    }]

    exposesArguments = ['rndListItem']

    async behavior(...args): Promise<Boolean> {
        // this is not supposed to be resolved.
        let list = this.getParam("list");
        if (list) {
            this.setStorageParam('rndListItem', this.resolveStringEmbeds(rndArrayItem(list)))
        }
        return true
    }

}