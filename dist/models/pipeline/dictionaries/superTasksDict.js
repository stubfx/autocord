import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { CreateChannelAndMoveUser } from "../tasks/superTasks/createChannelAndMoveUser.js";
import { DeleteChannelOnUserLeave } from "../tasks/superTasks/deleteChannelOnUserLeave.js";
import { UnknownChainLink } from "../chain/UnknownChainLink.js";
import { TemporaryVoiceChannels } from "../tasks/superTasks/TemporaryVoiceChannels.js";
export class SuperTasksDict {
    getById(id, params = []) {
        switch (id) {
            case ChainLinkTypes.IDs.SuperTask.CreateChannelAndMoveUser:
                return new CreateChannelAndMoveUser(params);
            case ChainLinkTypes.IDs.SuperTask.DeleteChannelOnUserLeave:
                return new DeleteChannelOnUserLeave(params);
            case ChainLinkTypes.IDs.SuperTask.TemporaryVoiceChannels:
                return new TemporaryVoiceChannels(params);
            default:
                return new UnknownChainLink();
        }
    }
}
//# sourceMappingURL=superTasksDict.js.map