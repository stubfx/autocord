import * as dbAdapter from "../db/dbAdapter.js";
import { JobFactory } from "../models/JobFactory.js";
import * as LoggerHelper from "../loggerHelper.js";
import { GuildEventsCache } from "../cacheSystem/guildEventsCache.js";
export const skipEventsCache = new GuildEventsCache();
export async function runEventForGuilds(guildId, eventName, eventArgs = {}) {
    console.log(`Guild: ${guildId} event: ${eventName}`);
    if (skipEventsCache.isEventInCache(guildId, eventName)) {
        // do not run if the guild is not listening for this event
        // save cpu and db calls
        console.log(`SKIPPING Guild: ${guildId} event: ${eventName}`);
        return;
    }
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, async (guildInterface) => {
        if (!guildInterface || guildInterface.jobs.length < 1) {
            // no guild, no party.
            skipEventsCache.addGuildEvent(guildId, eventName);
            return;
        }
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
                    await JobFactory.createJob(job, storageData, guildInterface).run();
                }
            }
        }
        catch (e) {
            // wont explode for the command itself as we are not waiting for it.
            LoggerHelper.error(e);
        }
    });
}
//# sourceMappingURL=EventHandler.js.map