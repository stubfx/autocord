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
import { UnknownChainLink } from "../chain/UnknownChainLink.js";
import { DeleteMessage } from "../tasks/DeleteMessage.js";
export class TaskDict {
    getById(id, params = []) {
        switch (id) {
            case ChainLinkTypes.IDs.Task.SendMessage:
                return new SendMessage(params);
            case ChainLinkTypes.IDs.Task.IncreaseStorageCounter:
                return new IncreaseCounter(params);
            case ChainLinkTypes.IDs.Task.SetStorageValue:
                return new SetStorageValue(params);
            case ChainLinkTypes.IDs.Task.AssignRole:
                return new AssignRole(params);
            case ChainLinkTypes.IDs.Task.AddMessageReaction:
                return new AddMessageReaction(params);
            case ChainLinkTypes.IDs.Task.CreateChannel:
                return new CreateChannel(params);
            case ChainLinkTypes.IDs.Task.UpdateChannel:
                return new UpdateChannel(params);
            case ChainLinkTypes.IDs.Task.DeleteChannel:
                return new DeleteChannel(params);
            case ChainLinkTypes.IDs.Task.RandomListElement:
                return new RandomListElement(params);
            case ChainLinkTypes.IDs.Task.MoveUserInChannel:
                return new MoveUserInChannel(params);
            case ChainLinkTypes.IDs.Task.DeleteMessage:
                return new DeleteMessage(params);
            default:
                return new UnknownChainLink();
        }
    }
}
//# sourceMappingURL=taskDict.js.map