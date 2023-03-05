import { LoggerHelper } from "../loggerHelper.js";
import mongoose from "mongoose";
import { GuildModel } from "../schemas/guildSchema.js";
import { JobModel } from "../schemas/jobSchema.js";
import { GuildStorage } from "../schemas/guildStorageSchema.js";
import { JOBS, STORAGE } from "../schemas/schemas.js";
import { skipEventsCache } from "../eventLifecycle/EventHandler.js";
export let mongooseConnection = null;
export async function init() {
    mongoose.set('strictQuery', false);
    mongooseConnection = await mongoose.connect(process.env.db_conn_string, { dbName: process.env.db_collection_name });
}
async function saveJobToDB(job) {
    return await new JobModel(job.toJobInterface()).save();
}
export async function deleteJob(guildId, job) {
    let guild = await getGuild(guildId);
    let hasId = !!job.id;
    if (hasId) {
        // only if the guild exists
        // and has the job inside.
        if (guild && !!guild.jobs.find(el => el._id.toString() === job.id)) {
            await JobModel.deleteOne({ _id: job.id });
            return true;
        }
        // mmmm, sketchy stuff here.
        LoggerHelper.error(new Error("Job already has an id, but it does not match the guild?"));
        return false;
    }
}
export async function createGuildWithStorage(guildId, mongoJobId = null) {
    // first make sure to create the storage for this guild!
    let storage = await new GuildStorage({
        data: {}
    }).save();
    let jobs = [];
    if (mongoJobId) {
        jobs.push(jobs);
    }
    await new GuildModel({
        guildId: guildId,
        jobs: jobs,
        storage: storage._id
    }).save();
}
export async function saveJob(guildId, job) {
    let guild = await getGuild(guildId);
    let hasId = !!job.id;
    if (hasId) {
        // only if the guild exists
        // and has the job inside.
        if (guild && !!guild.jobs.find(el => el._id.toString() === job.id)) {
            await JobModel.findOneAndReplace({ _id: job.id }, job.toJobInterface());
            skipEventsCache.clearGuildCache(guildId);
            return true;
        }
        // mmmm, sketchy stuff here.
        LoggerHelper.error(new Error("Job already has an id, but it does not match the guild?"));
        return false;
    }
    else {
        // then this must be a new job, awesome!
        // do we already have the guild?
        if (guild) {
            // ok let's check if there are already MAX_JOB_PER_GUILD jobs inside then!
            if (guild.jobs.length > +process.env.MAX_JOB_PER_GUILD) {
                // guild has already 3 jobs
                // unlucky :/
                return false;
            }
            // less than 3 jobs here, add it!
            let saved = await saveJobToDB(job);
            guild.jobs.push(new mongoose.Types.ObjectId(saved._id));
            // ok, just update it then.
            guild.save();
            skipEventsCache.clearGuildCache(guildId);
            return true;
        }
        // no guild, no job, must be a new user, welcome!
        let saved = await saveJobToDB(job);
        // in this case the guild does not exist!
        await createGuildWithStorage(guildId, saved._id);
        skipEventsCache.clearGuildCache(guildId);
        return true;
    }
}
// export async function withGuild(guildId: string, func: (guildInterface: GuildInterface) => Promise<void>) {
//     let guild = JobGuildModel.findOne({guildId: guildId});
//     if (guild) {
//         // @ts-ignore
//         await func(guild as GuildInterface)
//     }
// }
export async function getGuild(guildId) {
    return GuildModel.findOne({ guildId: guildId }).populate(STORAGE).populate(JOBS);
}
export async function forGuildListeningForEvent(guildId, eventName, func) {
    let guild = await GuildModel.findOne({ guildId: guildId })
        .populate(STORAGE)
        // .populate(JOBS)
        .populate({
        path: JOBS,
        match: { 'chain.chainLinks.0.name': eventName }
    });
    // @ts-ignore
    await func(guild);
}
export async function forAllGuildsListeningForEvent(eventName, func) {
    let cursor = await GuildModel.find()
        .populate(STORAGE)
        .populate({
        path: JOBS,
        match: { 'chain.chainLinks.0.name': eventName }
    }).cursor();
    for (let guild = await cursor.next(); guild != null; guild = await cursor.next()) {
        // @ts-ignore
        await func(guild);
    }
}
//# sourceMappingURL=dbAdapter.js.map