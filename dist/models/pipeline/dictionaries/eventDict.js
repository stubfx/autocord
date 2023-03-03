import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { MessageCreate } from "../Events/MessageCreate.js";
import { VoiceStateUpdate } from "../Events/VoiceStateUpdate.js";
import { ChannelCreate } from "../Events/ChannelCreate.js";
import { GuildMemberAdd } from "../Events/GuildMemberAdd.js";
import { MessageReactionAdd } from "../Events/MessageReactionAdd.js";
export class EventDict {
    getEventByName(chainLinkEventName, params = []) {
        switch (chainLinkEventName) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate(params);
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params);
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate(params);
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd(params);
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd(params);
            default:
                throw new Error(`Unknown condition name: ${chainLinkEventName}`);
        }
    }
}
//# sourceMappingURL=eventDict.js.map