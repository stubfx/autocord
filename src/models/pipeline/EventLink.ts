import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class EventLink extends ChainLink<ChainLinkTypes.IDs.Event> {
    abstract name: string;
    readonly type = ChainLinkTypes.LinkType.EVENT;
    abstract behavior(...args) : Promise<Boolean>

}