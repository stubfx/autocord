import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";


export interface ChainLinkInterface {
    type: ChainLinkTypes.LinkType
    params: Array<string>
    description: string
    name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event
}