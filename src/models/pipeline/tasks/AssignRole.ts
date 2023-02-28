import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {discordClient} from "../../../discordbot.js";

export class AssignRole extends Task {
    name = ChainLinkTypes.Task.AssignRole;

    acceptParams = ["userId", "roleId"]

    async behavior(...args) : Promise<Boolean> {
        let userId = this.getResolvedParam("userId");
        let roleId = this.getResolvedParam("roleId");
        let guildObject = discordClient.guilds.cache.find(guild => guild.id === this.guild.guildId);
        let role = guildObject.roles.cache.find(role => role.id === roleId)
        let member = await guildObject.members.fetch(userId)
        await member.roles.add(role)
        return true
    }

}