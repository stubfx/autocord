import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam.js";

export class ChannelCreate extends EventLink {
    name = ChainLinkTypes.Event.ChannelCreate;

    params: Array<ChainLinkParam> = [{
        name: this.name,
        description: "Fired when a new channel gets created",
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