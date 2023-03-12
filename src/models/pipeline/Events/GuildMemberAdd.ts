import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class GuildMemberAdd extends EventLink {
    readonly id: ChainLinkTypes.IDs.Event.GuildMemberAdd;
    name = ChainLinkTypes.IDs.Event.GuildMemberAdd;

    description = "Fired when a user joins a guild"

    exposesArguments = [
        "userId",
        "username"
    ]


    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

}