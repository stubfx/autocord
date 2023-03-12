import * as dbAdapter from "../db/dbAdapter.js";
import { JobFactory } from "../models/JobFactory.js";
import { LoggerHelper } from "../loggerHelper.js";
import { GuildEventsCache } from "../cacheSystem/guildEventsCache.js";
import localDB from "../db/local/localDB.js";
export const skipEventsCache = new GuildEventsCache();
export async function runEventForGuild(guildId, eventName, eventArgs = {}, internalArgs = {}) {
    if (skipEventsCache.isEventInCache(guildId, eventName)) {
        // do not run if the guild is not listening for this event
        // save cpu and db calls
        console.log(`SKIPPING Guild: ${guildId} event: ${eventName}`);
        return;
    }
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, runJobEventForGuild(eventName, eventArgs, internalArgs));
}
export async function runEventForAllGuilds(eventName, eventArgs = {}, internalArgs = {}) {
    await dbAdapter.forAllGuildsListeningForEvent(eventName, runJobEventForGuild(eventName, eventArgs, internalArgs));
}
function runJobEventForGuild(eventName, eventArgs, internalArgs) {
    return async (guildInterface) => {
        localDB.data.eventCount++;
        if (!guildInterface) {
            return;
        }
        // don't even check for events, yet.
        // if (!guildInterface || guildInterface.jobs.length < 1) {
        //     // no guild, no party.
        //     skipEventsCache.addGuildEvent(guildInterface.guildId, eventName)
        //     return
        // }
        try {
            for (let job of guildInterface.jobs) {
                // find the right job
                // check if necessary? Data is already coming from db.
                // if (job.chain && job.chain.chainLinks[0].name === eventName) {
                // found it!
                // make sure to enrich the storage data with the actual storage + eventArgs
                let storageData = {
                    ...eventArgs,
                    ...guildInterface.storage.data,
                };
                let vault = {
                    ...internalArgs
                };
                LoggerHelper.dev(`Guild: ${guildInterface.guildId} - event: ${eventName} - Job: ${job.name}(${job.id})`);
                await JobFactory.createJob(job, storageData, vault, guildInterface).run();
            }
        }
        catch (e) {
            LoggerHelper.error(e);
        }
        await localDB.write();
    };
}
//# sourceMappingURL=EventHandler.js.map