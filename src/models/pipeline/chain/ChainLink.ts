import {TaskResult} from "../TaskResult";

export enum ChainLinkType {
    EVENT = "EVENT",
    CONDITION = "CONDITION",
    TASK = "TASK"
}

export interface ChainLink {

    name: string;
    type: ChainLinkType
    params: Array<string>
    exec(guildId : string, ...args): Promise<TaskResult>

    // toJson() : any

}