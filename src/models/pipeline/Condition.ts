import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class Condition extends ChainLink<ChainLinkTypes.IDs.Condition> {
    abstract name: ChainLinkTypes.IDs.Condition;
    readonly type = ChainLinkTypes.LinkType.CONDITION;

    abstract behavior(...args) : Promise<Boolean>

    // abstract toJson() : any


}