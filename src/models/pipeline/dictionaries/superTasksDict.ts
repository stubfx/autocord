import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {CreateChannelAndMoveUser} from "../tasks/superTasks/createChannelAndMoveUser.js";
import {DeleteChannelOnUserLeave} from "../tasks/superTasks/deleteChannelOnUserLeave.js";
import {ChainLink} from "../chain/ChainLink.js";
import {UnknownChainLink} from "../chain/UnknownChainLink.js";
import {TemporaryVoiceChannels} from "../tasks/superTasks/TemporaryVoiceChannels.js";

export class SuperTasksDict {

    getById(id: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        switch (id) {
            case ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser:
                return new CreateChannelAndMoveUser(params)
            case ChainLinkTypes.IDs.SuperTask.DeleteChannelOnUserLeave:
                return new DeleteChannelOnUserLeave(params)
            case ChainLinkTypes.IDs.SuperTask.TemporaryVoiceChannels:
                return new TemporaryVoiceChannels(params)
            default:
                return new UnknownChainLink()
        }
    }

}