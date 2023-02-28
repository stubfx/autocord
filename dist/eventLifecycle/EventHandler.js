import * as dbAdapter from "../dbAdapter.js";
import { PipelineFactory } from "../models/PipelineFactory.js";
import * as LoggerHelper from "../loggerHelper.js";
export async function runEventForGuilds(guildId, eventName, eventArgs = {}) {
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, async (guildInterface) => {
        try {
            for (let job of guildInterface.jobs) {
                // find the right job
                if (job.chain && job.chain.chainLinks[0].name === eventName) {
                    // found it!
                    // make sure to enrich the storage data with the actual storage + eventArgs
                    let storageData = {
                        ...eventArgs,
                        ...guildInterface.storage.data
                    };
                    PipelineFactory.createJob(job, storageData, guildInterface).run();
                }
            }
        }
        catch (e) {
            LoggerHelper.error(e);
        }
    });
}
//# sourceMappingURL=EventHandler.js.map