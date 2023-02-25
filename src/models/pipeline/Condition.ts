import {ChainLink, ChainLinkType} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult.js";

export abstract class Condition implements ChainLink {
    abstract name: string;
    abstract params: Array<string>;
    readonly type = ChainLinkType.CONDITION;

    abstract exec(...args) : Promise<TaskResult>

    // abstract toJson() : any


}