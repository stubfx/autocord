import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {ChainLinkParam} from "../chain/ChainLinkParam";

export class VoiceStateUpdate extends EventLink {
    name = ChainLinkTypes.Event.VoiceStateUpdate;

    params: Array<ChainLinkParam> = [{
        name: this.name,
        description: "Fired when a user joins a channel",
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