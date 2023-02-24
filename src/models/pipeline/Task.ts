import {ChainLink} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult.js";

export abstract class Task implements ChainLink {
    abstract name: string;
    readonly type = 'TASK';

    params: Array<string> = [];

    abstract exec(...args) : Promise<TaskResult>

    // abstract toJson() : any


}