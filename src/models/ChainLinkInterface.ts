import {ChainLinkType} from "./pipeline/chain/ChainLink.js";

export interface ChainLinkInterface {
    type: ChainLinkType
    params: Array<string>
    name: string
}