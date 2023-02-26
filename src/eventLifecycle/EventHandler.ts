import * as dbAdapter from "../dbAdapter.js";
import {PipelineFactory} from "../models/PipelineFactory.js";
import * as LoggerHelper from "../loggerHelper.js";

export async function runEventForGuilds(guildId: string, eventName: string) {
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, async guildInterface => {
        try {
            for (let job of guildInterface.jobs) {
                // find the right job
                if (job.chain && job.chain[0].name === eventName) {
                    // found it!
                    PipelineFactory.createJob(job).run(guildId)
                }
            }
        } catch (e) {
            LoggerHelper.error(e)
        }

    })
}