import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export abstract class SuperTask extends ChainLink<ChainLinkTypes.IDs.SuperTask> {
    abstract name: ChainLinkTypes.IDs.SuperTask;
    readonly type = ChainLinkTypes.LinkType.SUPERTASK;

    abstract behavior(...args) : Promise<Boolean>

}