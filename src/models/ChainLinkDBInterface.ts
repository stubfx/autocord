import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";


export interface ChainLinkDBInterface {
    type: ChainLinkTypes.LinkType
    params: Array<string>
    // description: string // do not save in db
    name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event
}