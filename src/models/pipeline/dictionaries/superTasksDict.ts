import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {SuperTask} from "../SuperTask.js";
import {CreateChannelAndMoveUser} from "../tasks/superTasks/createChannelAndMoveUser.js";
import {DeleteChannelOnUserLeave} from "../tasks/superTasks/deleteChannelOnUserLeave.js";

export class SuperTasksDict {

    getTaskByName(chainLinkTaskName: string, params: ChainLinkParam[] = []) : SuperTask {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.SuperTask.CreateChannelAndMoveUser:
                return new CreateChannelAndMoveUser(params)
            case ChainLinkTypes.SuperTask.DeleteChannelOnUserLeave:
                return new DeleteChannelOnUserLeave(params)
            default:
                throw new Error(`Unknown superTask name: ${chainLinkTaskName}`)
        }
    }

}