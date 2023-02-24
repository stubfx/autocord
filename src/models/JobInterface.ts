import {ChainLinkInterface} from "./ChainLinkInterface.js";

export interface JobInterface {
    name: string
    firedOn: string
    chain: Array<ChainLinkInterface>
}