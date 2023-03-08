import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class GuildMemberAdd extends EventLink {
    name = ChainLinkTypes.Event.GuildMemberAdd;

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