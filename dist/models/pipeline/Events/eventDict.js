import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { GuildMemberAdd } from "./GuildMemberAdd.js";
import { MessageCreate } from "./MessageCreate.js";
import { MessageReactionAdd } from "./MessageReactionAdd.js";
import { ChannelCreate } from "./ChannelCreate.js";
import { VoiceStateUpdate } from "./VoiceStateUpdate.js";
export class EventDictionary {
}
export const eventDict = [{
        name: ChainLinkTypes.Event.GuildMemberAdd,
        Clazz: GuildMemberAdd
    }, {
        name: ChainLinkTypes.Event.MessageCreate,
        Clazz: MessageCreate
    }, {
        name: ChainLinkTypes.Event.MessageReactionAdd,
        Clazz: MessageReactionAdd
    }, {
        name: ChainLinkTypes.Event.ChannelCreate,
        Clazz: ChannelCreate
    }, {
        name: ChainLinkTypes.Event.VoiceStateUpdate,
        Clazz: VoiceStateUpdate
    }];
//# sourceMappingURL=eventDict.js.map