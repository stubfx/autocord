import {ChainLinkTypes} from "./ChainLinkTypes.js";

export abstract class ChainLink {

    readonly name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"
    params: Array<string> = []

    run(guildId : string, ...args): Promise<Boolean> {
        return this.behavior()
    }

    protected abstract behavior() : Promise<Boolean>

}