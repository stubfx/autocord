import {ChainLink, ChainLinkType} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult.js";

export abstract class Task implements ChainLink {
    abstract name: string;
    readonly type = ChainLinkType.TASK;

    params: Array<string> = [];

    abstract exec(...args) : Promise<TaskResult>

    // abstract toJson() : any


}