import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";
import {ChainLinkParam} from "./pipeline/chain/ChainLinkParam.js";


export interface ChainLinkInterface {
    type: ChainLinkTypes.LinkType
    params: Array<ChainLinkParam>
    name: ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event
}