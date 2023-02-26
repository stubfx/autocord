import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam.js";

export class GuildMemberAdd extends EventLink {
    name = ChainLinkTypes.Event.GuildMemberAdd;

    params: Array<ChainLinkParam> = [{
        name: this.name,
        description: "Fired when a user joins a guild",
        type: ChainLinkTypes.ChainLinkParamType.STRING
    }];

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

    // toJson(): any {
    //
    // }

}