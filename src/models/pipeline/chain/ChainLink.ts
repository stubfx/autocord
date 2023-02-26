import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkParam} from "./ChainLinkParam.js";

export abstract class ChainLink {

    name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event;
    type: ChainLinkTypes.LinkType
    params: Array<ChainLinkParam>

    run(guildId : string, ...args): Promise<Boolean> {
        return this.behavior()
    }

    protected abstract behavior() : Promise<Boolean>

}