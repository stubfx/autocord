import {ChainLinkParam} from "../../ChainLinkInterface.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {MessageCreate} from "../Events/MessageCreate.js";
import {VoiceStateUpdate} from "../Events/VoiceStateUpdate.js";
import {ChannelCreate} from "../Events/ChannelCreate.js";
import {GuildMemberAdd} from "../Events/GuildMemberAdd.js";
import {MessageReactionAdd} from "../Events/MessageReactionAdd.js";
import {EveryHour} from "../Events/customEvents/EveryHour.js";
import {EveryDay} from "../Events/customEvents/EveryDay.js";
import {Randomly} from "../Events/customEvents/Randomly.js";
import {UnknownChainLink} from "../chain/UnknownChainLink.js";
import {ChainLink} from "../chain/ChainLink.js";

export class EventDict {

    getById(id: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        switch (id) {
            case ChainLinkTypes.IDs.Event.MessageCreate:
                return new MessageCreate(params)
            case ChainLinkTypes.IDs.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params)
            case ChainLinkTypes.IDs.Event.ChannelCreate:
                return new ChannelCreate(params)
            case ChainLinkTypes.IDs.Event.GuildMemberAdd:
                return new GuildMemberAdd(params)
            case ChainLinkTypes.IDs.Event.MessageReactionAdd:
                return new MessageReactionAdd(params)
            case ChainLinkTypes.IDs.Event.EveryHour:
                return new EveryHour(params)
            case ChainLinkTypes.IDs.Event.EveryDay:
                return new EveryDay(params)
            case ChainLinkTypes.IDs.Event.Randomly:
                return new Randomly(params)
            default:
                return new UnknownChainLink()
        }
    }

}