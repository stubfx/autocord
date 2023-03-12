import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {CreateChannelAndMoveUser} from "../tasks/superTasks/createChannelAndMoveUser.js";
import {DeleteChannelOnUserLeave} from "../tasks/superTasks/deleteChannelOnUserLeave.js";
import {ChainLink} from "../chain/ChainLink.js";
import {UnknownChainLink} from "../chain/UnknownChainLink.js";

export class SuperTasksDict {

    getTaskByName(chainLinkTaskName: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser:
                return new CreateChannelAndMoveUser(params)
            case ChainLinkTypes.IDs.SuperTask.DeleteChannelOnUserLeave:
                return new DeleteChannelOnUserLeave(params)
            default:
                return new UnknownChainLink()
        }
    }

}