import {ChainLinkInterface} from "./ChainLinkInterface";
import mongoose from "mongoose";

export interface JobInterface {
    id: string
    name: string
    chain: {chainLinks: Array<ChainLinkInterface>}
}