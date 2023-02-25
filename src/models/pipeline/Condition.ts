import {ChainLink} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class Condition implements ChainLink {
    abstract name: ChainLinkTypes.Condition;
    abstract params: Array<string>;
    readonly type = ChainLinkTypes.LinkType.CONDITION;

    abstract exec(...args) : Promise<TaskResult>

    // abstract toJson() : any


}