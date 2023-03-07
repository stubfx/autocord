import { DiscordAdapter } from "../DiscordAdapter.js";
import * as sessionV from "../sessionVariables.js";
import * as dbAdapter from "../db/dbAdapter.js";
import * as storageDBAdapter from "../db/storageDBAdapter.js";
import { JobFactory } from "../models/JobFactory.js";
import { LoggerHelper } from "../loggerHelper.js";
import { STORAGE } from "../schemas/schemas.js";
import Discord from "discord.js";
import { discordClient } from "../discordbot.js";
export default function (api, opts, done) {
    api.addHook('preHandler', async (request, reply) => {
        if (!request.session[sessionV.AUTHENTICATED]) {
            reply.code(401);
            reply.send({});
            return reply;
        }
        let guildId = request.body["guildId"];
        if (guildId) {
            // if the body contains a guild id, check it.
            try {
                // check if the user is actually the owner of the guild passed as param
                if (!request.session.ownedGuilds.includes(guildId)) {
                    reply.code(401);
                    reply.send({});
                    return reply;
                }
            }
            catch (e) {
                LoggerHelper.error(e);
                reply.code(401);
                reply.send({});
                return reply;
            }
        }
        // this is wrong, not all the checks have the guild inside, just let it be.
        // reply.code(401)
        // reply.send({})
        // return reply
    });
    api.post("/logout", async (request) => {
        await request.session.destroy();
        return { msg: 'bye!' };
    });
    api.post("/ownedGuilds", async (request) => {
        let partialGuilds = await new DiscordAdapter(request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN]).getUserOwnedGuilds();
        request.session.ownedGuilds = partialGuilds.map(value => value.id);
        return partialGuilds;
    });
    api.post("/user", async (request) => {
        return await new DiscordAdapter(request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN]).getUserInfo();
    });
    api.post("/deleteJob", async (request) => {
        let guildId = request.body["guildId"];
        let rawJob = request.body["job"];
        if (!rawJob.id) {
            // no id, abort.
            return {};
        }
        let jobInstance = JobFactory.createJob(rawJob);
        await dbAdapter.deleteJob(guildId, jobInstance);
        return {};
    });
    api.post("/getGuildChannels", async (request) => {
        let guildId = request.body["guildId"];
        return await new DiscordAdapter().getGuildChannels(guildId);
    });
    api.post("/getGuildRoles", async (request) => {
        let guildId = request.body["guildId"];
        return await new DiscordAdapter().getGuildRoles(guildId);
    });
    api.post("/checkBotInGuild", async (request) => {
        let guildId = request.body["guildId"];
        return await new DiscordAdapter().checkServer(guildId);
    });
    api.post("/addStorageData", async (request) => {
        let guildId = request.body["guildId"];
        let dataName = request.body["dataName"];
        return await storageDBAdapter.addStorageData(guildId, dataName);
    });
    api.post("/deleteStorageData", async (request) => {
        let guildId = request.body["guildId"];
        let dataName = request.body["dataName"];
        return await storageDBAdapter.deleteStorageData(guildId, dataName);
    });
    api.post("/checkBotPermissionForGuildJobs", async (request) => {
        let guildId = request.body["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        let permissions = [];
        if (guild) {
            for (let job of guild.jobs) {
                // @ts-ignore
                permissions.push(JobFactory.createJob(job).getRequiredPermissionBitFields());
            }
        }
        // get bot permissions in guild:
        let fetchedGuild = await discordClient.guilds.fetch(guildId);
        let check = new Discord.PermissionsBitField(fetchedGuild.members.me.permissions).has(permissions, true);
        console.log(check);
        return { hasPermissions: check };
    });
    api.post("/getRefreshBotUrlPermissions", async (request) => {
        let guildId = request.body["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        let permissions = [];
        if (guild) {
            for (let job of guild.jobs) {
                // @ts-ignore
                permissions.push(JobFactory.createJob(job).getRequiredPermissionBitFields());
            }
        }
        console.log(new Discord.PermissionsBitField(permissions).bitfield);
        return { url: getBotAddPopupUrl(guildId) };
    });
    api.post("/getAddBotToGuildInvite", async (request) => {
        let guildId = request.body["guildId"];
        let url = `https://discord.com/oauth2/authorize?client_id=${process.env.discord_application_id}&permissions=${process.env.discord_bot_permission_int}&scope=bot%20applications.commands`;
        return { url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=${encodeURIComponent(process.env.discord_oauth_redirectUrl)}` };
    });
    function getBotAddPopupUrl(guildId) {
        let url = `https://discord.com/oauth2/authorize?client_id=${process.env.discord_application_id}&permissions=${process.env.discord_bot_permission_int}&scope=bot%20applications.commands`;
        return { url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=${encodeURIComponent(process.env.discord_oauth_redirectUrl + '/popup')}` };
    }
    api.post("/getAddBotToGuildPopupInvite", async (request) => {
        let guildId = request.body["guildId"];
        return getBotAddPopupUrl(guildId);
    });
    api.post("/getGuildJobs", async (request) => {
        let guildId = request.body["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        // we need to add the metadata!
        let jobs = [];
        let storage;
        if (!guild) {
            // we must add it then!
            await dbAdapter.createGuildWithStorage(guildId);
            guild = await dbAdapter.getGuild(guildId);
        }
        storage = guild[STORAGE];
        for (let job of guild.jobs) {
            // map does not work?
            // guild.jobs = guild.jobs.map(el => PipelineFactory.createJob(el))
            // @ts-ignore
            jobs.push(JobFactory.createJob(job));
        }
        return {
            storage,
            jobs
        };
    });
    api.post("/saveJob", async (request) => {
        let guildId = request.body["guildId"];
        let rawJob = request.body["job"];
        let jobInstance = JobFactory.createJob(rawJob);
        await dbAdapter.saveJob(guildId, jobInstance);
        LoggerHelper.success(`saved job for guild ${guildId}`);
        return {};
    });
    // only for authenticated users with role.
    // api.register(async role => {
    //     role.addHook('preHandler', async (req, res) => {
    //         // check role for all role routes
    //         // if (res.sent) return //stop on error
    //     })
    //
    //     role.get('/my_profile', async () => {
    //         return {hello: 'world'}
    //     })
    //
    // })
    done();
}
//# sourceMappingURL=auth.js.map