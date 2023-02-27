import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class Condition extends ChainLink<ChainLinkTypes.Condition> {
    abstract name: ChainLinkTypes.Condition;
    readonly type = ChainLinkTypes.LinkType.CONDITION;

    abstract behavior(...args) : Promise<Boolean>

    // abstract toJson() : any


}