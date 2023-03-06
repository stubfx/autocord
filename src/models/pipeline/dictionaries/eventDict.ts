import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {EventLink} from "../EventLink.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {MessageCreate} from "../Events/MessageCreate.js";
import {VoiceStateUpdate} from "../Events/VoiceStateUpdate.js";
import {ChannelCreate} from "../Events/ChannelCreate.js";
import {GuildMemberAdd} from "../Events/GuildMemberAdd.js";
import {MessageReactionAdd} from "../Events/MessageReactionAdd.js";
import {EveryHour} from "../Events/customEvents/EveryHour.js";
import {EveryDay} from "../Events/customEvents/EveryDay.js";
import {Randomly} from "../Events/customEvents/Randomly.js";

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
            case ChainLinkTypes.Event.EveryDay:
                return new EveryDay(params)
            case ChainLinkTypes.Event.Randomly:
                return new Randomly(params)
            default:
                throw new Error(`Unknown event name: ${chainLinkEventName}`)
        }
    }

}