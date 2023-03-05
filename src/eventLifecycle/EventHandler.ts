import * as dbAdapter from "../db/dbAdapter.js";
import {JobFactory} from "../models/JobFactory.js";
import {LoggerHelper} from "../loggerHelper.js";
import {GuildEventsCache} from "../cacheSystem/guildEventsCache.js";

export const skipEventsCache = new GuildEventsCache()

export async function runEventForGuild(guildId: string, eventName: string, eventArgs = {}) {
    if (skipEventsCache.isEventInCache(guildId, eventName)) {
        // do not run if the guild is not listening for this event
        // save cpu and db calls
        console.log(`SKIPPING Guild: ${guildId} event: ${eventName}`)
        return
    }
    await dbAdapter.forGuildListeningForEvent(guildId, eventName, runJobEventForGuild(eventName, eventArgs))
}

export async function runEventForAllGuilds(eventName: string, eventArgs = {}) {
    await dbAdapter.forAllGuildsListeningForEvent(eventName, runJobEventForGuild(eventName, eventArgs))
}

function runJobEventForGuild(eventName: string, eventArgs: {}) {
    return async guildInterface => {
        if (!guildInterface) {
            return
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
                    ...guildInterface.storage.data
                }
                LoggerHelper.dev(`Guild: ${guildInterface.guildId} - event: ${eventName} - Job: ${job.name}(${job.id})`)
                await JobFactory.createJob(job, storageData, guildInterface).run()
            }
        } catch (e) {
            LoggerHelper.error(e)
        }

    };
}