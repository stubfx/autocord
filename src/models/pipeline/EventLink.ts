import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";
import {ChainLinkParam} from "./chain/ChainLinkParam.js";

export abstract class EventLink extends ChainLink {
    abstract name: ChainLinkTypes.Event;
    readonly type = ChainLinkTypes.LinkType.EVENT;

    params: Array<ChainLinkParam> = [];

    abstract behavior(...args) : Promise<Boolean>

}