import {ChainLinkInterface} from "./ChainLinkInterface";

export interface JobInterface {
    id: string
    name: string
    chain: {chainLinks: Array<ChainLinkInterface>}
}