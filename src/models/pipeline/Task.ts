import {ChainLink} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class Task implements ChainLink {
    abstract name: ChainLinkTypes.Task;
    readonly type = ChainLinkTypes.LinkType.TASK;

    params: Array<string> = [];

    abstract exec(...args) : Promise<TaskResult>

    // abstract toJson() : any


}