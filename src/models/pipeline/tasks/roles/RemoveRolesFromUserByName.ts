import {Task} from "../../Task.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class RemoveRolesFromUserByName extends Task {
    id = ChainLinkTypes.IDs.Task.RemoveRolesFromUserByName;
    name = ChainLinkTypes.IDs.Task.RemoveRolesFromUserByName;

    description = 'Remove all user roles by the given name'

    acceptParams = [{
        name: "userId",
        type: ChainLinkTypes.Param.STRING
    },{
        name: "roleContains",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args): Promise<Boolean> {
        let userId = this.getResolvedParam("userId");
        let roleContains = this.getResolvedParam("roleContains");
        let guild = await this.getFetchedGuild()
        let member = await guild.members.fetch(userId)
        let roleIds = member.roles.cache.map(el => {
            // if role name includes "contains"
            if (el.name.includes(roleContains)) {
                // apparently some ids may be undefined?
                return el.id
            }
        }).filter(el => !!el) // we are doomed to filter this unfortunately, this keeps returning 2 undefined on top.
        await member.roles.remove(roleIds)
        return true
    }

}