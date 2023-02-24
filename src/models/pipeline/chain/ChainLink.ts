import {TaskResult} from "../TaskResult";

export interface ChainLink {

    name: string;
    type: 'CONDITION' | 'TASK'
    params: Array<string>
    exec(guildId : string, ...args): Promise<TaskResult>

    // toJson() : any

}