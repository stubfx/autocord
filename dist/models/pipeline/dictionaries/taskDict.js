import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { SendMessage } from "../tasks/SendMessage.js";
import { IncreaseCounter } from "../tasks/dataMutators/IncreaseCounter.js";
import { AssignRole } from "../tasks/AssignRole.js";
import { AddMessageReaction } from "../tasks/AddMessageReaction.js";
import { CreateChannel } from "../tasks/CreateChannel.js";
import { DeleteChannel } from "../tasks/DeleteChannel.js";
import { SetStorageValue } from "../tasks/dataMutators/SetStorageValue.js";
import { UpdateChannel } from "../tasks/UpdateChannel.js";
import { RandomListElement } from "../tasks/RandomListElement.js";
import { MoveUserInChannel } from "../tasks/MoveUserInChannel.js";
export class TaskDict {
    getTaskByName(chainLinkTaskName, params = []) {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage(params);
            case ChainLinkTypes.Task.IncreaseStorageCounter:
                return new IncreaseCounter(params);
            case ChainLinkTypes.Task.SetStorageValue:
                return new SetStorageValue(params);
            case ChainLinkTypes.Task.AssignRole:
                return new AssignRole(params);
            case ChainLinkTypes.Task.AddMessageReaction:
                return new AddMessageReaction(params);
            case ChainLinkTypes.Task.CreateChannel:
                return new CreateChannel(params);
            case ChainLinkTypes.Task.UpdateChannel:
                return new UpdateChannel(params);
            case ChainLinkTypes.Task.DeleteChannel:
                return new DeleteChannel(params);
            case ChainLinkTypes.Task.RandomListElement:
                return new RandomListElement(params);
            case ChainLinkTypes.Task.MoveUserInChannel:
                return new MoveUserInChannel(params);
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`);
        }
    }
}
//# sourceMappingURL=taskDict.js.map