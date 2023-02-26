import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";

export abstract class ChainLink implements ChainLinkInterface{

    readonly name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<string> = []
    // this holds the actual param data.
    // this will be saved into the db
    params: Array<ChainLinkParam>

    constructor(params: ChainLinkParam[] = []) {
        this.params = params
    }

    run(guildId : string, ...args): Promise<Boolean> {
        return this.behavior()
    }

    protected abstract behavior() : Promise<Boolean>

}