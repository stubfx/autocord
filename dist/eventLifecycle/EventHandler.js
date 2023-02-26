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
                    PipelineFactory.createJob(job, eventArgs).run(guildId);
                }
            }
        }
        catch (e) {
            LoggerHelper.error(e);
        }
    });
}
//# sourceMappingURL=EventHandler.js.map