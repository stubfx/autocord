import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { SendMessage } from "../tasks/SendMessage.js";
import { IncreaseCounter } from "../tasks/IncreaseCounter.js";
import { AssignRole } from "../tasks/AssignRole.js";
import { AddMessageReaction } from "../tasks/AddMessageReaction.js";
import { CreateChannel } from "../tasks/CreateChannel.js";
import { DeleteChannel } from "../tasks/DeleteChannel.js";
export class TaskDict {
    getTaskByName(chainLinkTaskName, params = []) {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage(params);
            case ChainLinkTypes.Task.IncreaseCounter:
                return new IncreaseCounter(params);
            case ChainLinkTypes.Task.AssignRole:
                return new AssignRole(params);
            case ChainLinkTypes.Task.AddMessageReaction:
                return new AddMessageReaction(params);
            case ChainLinkTypes.Task.CreateChannel:
                return new CreateChannel(params);
            case ChainLinkTypes.Task.DeleteChannel:
                return new DeleteChannel(params);
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`);
        }
    }
}
//# sourceMappingURL=taskDict.js.map