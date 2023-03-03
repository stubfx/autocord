import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { SendMessage } from "./SendMessage.js";
import { AddMessageReaction } from "./AddMessageReaction.js";
import { AssignRole } from "./AssignRole.js";
import { CreateChannel } from "./CreateChannel.js";
import { DeleteChannel } from "./DeleteChannel.js";
import { IncreaseCounter } from "./IncreaseCounter.js";
export const taskDict = [{
        name: ChainLinkTypes.Task.AddMessageReaction,
        Clazz: AddMessageReaction
    }, {
        name: ChainLinkTypes.Task.AssignRole,
        Clazz: AssignRole
    }, {
        name: ChainLinkTypes.Task.CreateChannel,
        Clazz: CreateChannel
    }, {
        name: ChainLinkTypes.Task.DeleteChannel,
        Clazz: DeleteChannel
    }, {
        name: ChainLinkTypes.Task.IncreaseCounter,
        Clazz: IncreaseCounter
    }, {
        name: ChainLinkTypes.Task.SendMessage,
        Clazz: SendMessage
    }];
//# sourceMappingURL=taskDict.js.map