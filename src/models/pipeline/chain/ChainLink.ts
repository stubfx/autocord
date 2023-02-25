import {TaskResult} from "../TaskResult";
import {ChainLinkTypes} from "./ChainLinkTypes.js";

export interface ChainLink {

    name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event;
    type: ChainLinkTypes.LinkType
    params: Array<string>
    exec(guildId : string, ...args): Promise<TaskResult>

    // toJson() : any

}