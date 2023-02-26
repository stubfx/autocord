import {ChainLinkDBInterface} from "./ChainLinkDBInterface";
import mongoose from "mongoose";

export interface JobInterface {
    id: string
    name: string
    chain: Array<ChainLinkDBInterface>
}