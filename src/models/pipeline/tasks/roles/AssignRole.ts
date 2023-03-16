import {Task} from "../../Task.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";
import {PermissionsBitField} from "discord.js";

export class AssignRole extends Task {
    id = ChainLinkTypes.IDs.Task.AssignRole;
    name = ChainLinkTypes.IDs.Task.AssignRole;

    description = 'Assigns the given role to the user.'

    requiredPermissions = [PermissionsBitField.Flags.ManageRoles]

    acceptParams = [{
        name: "userId",
        type: ChainLinkTypes.Param.STRING
    },{
        name: "roleId",
        type: ChainLinkTypes.Param.ROLE_ID
    }]

    async behavior(...args) : Promise<Boolean> {
        let userId = this.getResolvedParam("userId");
        let roleId = this.getResolvedParam("roleId");
        let guildObject = await this.getFetchedGuild()
        let role = guildObject.roles.cache.find(role => role.id === roleId)
        let member = await guildObject.members.fetch(userId)
        await member.roles.add(role)
        return true
    }

}