import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {MessageCreate} from "../Events/MessageCreate.js";
import {VoiceStateUpdate} from "../Events/VoiceStateUpdate.js";
import {ChannelCreate} from "../Events/ChannelCreate.js";
import {GuildMemberAdd} from "../Events/GuildMemberAdd.js";
import {MessageReactionAdd} from "../Events/MessageReactionAdd.js";
import {EveryHour} from "../Events/customEvents/EveryHour.js";

export class EventDict {

    getEventByName(chainLinkEventName: string, params: ChainLinkParam[] = []) : EventLink {
        switch (chainLinkEventName) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate(params)
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params)
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate(params)
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd(params)
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd(params)
            case ChainLinkTypes.Event.EveryHour:
                return new EveryHour(params)
            default:
                throw new Error(`Unknown condition name: ${chainLinkEventName}`)
        }
    }

}