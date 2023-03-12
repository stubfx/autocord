import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";

export interface ChainLinkParam {
    name: string,
    value: string
}

// EVERYTHING DECLARED HERE WILL END UP IN THE DB.
export interface ChainLinkInterface {
    type: ChainLinkTypes.LinkType
    params: Array<ChainLinkParam>
    id: ChainLinkTypes.IDs.Task
        | ChainLinkTypes.IDs.Condition
        | ChainLinkTypes.IDs.Event
        | ChainLinkTypes.IDs.SuperTask
        | ChainLinkTypes.IDs.UNKNOWN
}