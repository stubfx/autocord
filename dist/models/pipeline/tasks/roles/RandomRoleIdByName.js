import { Task } from "../../Task.js";
import { ChainLinkTypes } from "../../chain/ChainLinkTypes.js";
import { rndArrayItem } from "../../../../utils.js";
export class RandomRoleIdByName extends Task {
    id = ChainLinkTypes.IDs.Task.RandomRoleIdByName;
    name = ChainLinkTypes.IDs.Task.RandomRoleIdByName;
    description = 'Returns a random value from a list of given items.';
    acceptParams = [{
            name: "roleContains",
            type: ChainLinkTypes.Param.STRING
        }];
    exposesArguments = ['rndRoleId'];
    async behavior(...args) {
        // this is not supposed to be resolved.
        // let list = this.getParam("list");
        // if (list) {
        //     this.setStorageParam('rndListItem', this.resolveStringEmbeds(rndArrayItem(list)))
        // }
        let contains = this.getParam("roleContains");
        let guild = await this.getFetchedGuild();
        let roleIds = guild.roles.cache.map(el => {
            // if role name includes "contains"
            if (el.name.includes(contains)) {
                // apparently some ids may be undefined?
                return el.id;
            }
        }).filter(el => !!el); // we are doomed to filter this unfortunately, this keeps returning 2 undefined on top.
        let value = rndArrayItem(roleIds);
        this.setStorageParam('rndRoleId', value);
        return !!value;
    }
}
//# sourceMappingURL=RandomRoleIdByName.js.map