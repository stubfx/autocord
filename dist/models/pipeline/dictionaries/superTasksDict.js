import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { CreateChannelAndMoveUser } from "../tasks/superTasks/createChannelAndMoveUser.js";
import { DeleteChannelOnUserLeave } from "../tasks/superTasks/deleteChannelOnUserLeave.js";
export class SuperTasksDict {
    getTaskByName(chainLinkTaskName, params = []) {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.SuperTask.CreateChannelAndMoveUser:
                return new CreateChannelAndMoveUser(params);
            case ChainLinkTypes.SuperTask.DeleteChannelOnUserLeave:
                return new DeleteChannelOnUserLeave(params);
            default:
                throw new Error(`Unknown superTask name: ${chainLinkTaskName}`);
        }
    }
}
//# sourceMappingURL=superTasksDict.js.map