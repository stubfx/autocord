import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class Task extends ChainLink {
    abstract name: ChainLinkTypes.Task;
    readonly type = ChainLinkTypes.LinkType.TASK;

    abstract behavior(...args) : Promise<Boolean>

}