import {JobInterface} from "./JobInterface.js";

export interface GuildInterface {
    guildId: string

    jobs: Array<JobInterface>
}