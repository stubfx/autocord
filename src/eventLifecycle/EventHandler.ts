import * as dbAdapter from "../dbAdapter.js";
import {PipelineFactory} from "../models/PipelineFactory.js";

export async function runEventForGuilds(guildId: string, eventName: string) {
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, async guildInterface => {
        for (let job of guildInterface.jobs) {
            // find the right job
            if (job.firedOn === eventName) {
                // found it!
                PipelineFactory.createJob(job).run(guildId)
            }
        }
    })
}