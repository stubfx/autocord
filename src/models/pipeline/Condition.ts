import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";
import {ChainLinkParam} from "./chain/ChainLinkParam";

export abstract class Condition extends ChainLink {
    abstract name: ChainLinkTypes.Condition;
    abstract params: Array<ChainLinkParam>;
    readonly type = ChainLinkTypes.LinkType.CONDITION;

    abstract behavior(...args) : Promise<Boolean>

    // abstract toJson() : any


}