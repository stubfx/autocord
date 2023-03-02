import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class VoiceStateUpdate extends EventLink {
    name = ChainLinkTypes.Event.VoiceStateUpdate;

    description = "Fired when voice channel updates."

    exposesArguments = [
        'channelId',
        'channelName',
        'userId',
        'username',
        'memberCount',
        'action'
    ]

    async behavior(...args) : Promise<Boolean> {
        console.log(this.name)
        return true
    }

    // toJson(): any {
    //
    // }

}