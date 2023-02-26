import {ChainLinkInterface} from "./ChainLinkInterface.js";
import mongoose from "mongoose";

export interface JobInterface {
    id: string
    name: string
    chain: Array<ChainLinkInterface>
}