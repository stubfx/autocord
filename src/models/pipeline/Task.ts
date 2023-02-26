import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";
import {ChainLinkParam} from "./chain/ChainLinkParam.js";

export abstract class Task extends ChainLink {
    abstract name: ChainLinkTypes.Task;
    readonly type = ChainLinkTypes.LinkType.TASK;

    params: Array<ChainLinkParam> = [];

    abstract behavior(...args) : Promise<Boolean>

    // abstract toJson() : any

}