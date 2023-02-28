import { DiscordAdapter } from "../DiscordAdapter.js";
import * as sessionV from "../sessionVariables.js";
import * as dbAdapter from "../dbAdapter.js";
import { PipelineFactory } from "../models/PipelineFactory.js";
import * as LoggerHelper from "../loggerHelper.js";
import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
import { STORAGE } from "../schemas/schemas.js";
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
    });
    api.post("/ownedGuilds", async (request) => {
        let partialGuilds = await new DiscordAdapter(request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN]).getUserOwnedGuilds();
        request.session.ownedGuilds = partialGuilds.filter(value => value.owner).map(value => value.id);
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
        let jobInstance = PipelineFactory.createJob(rawJob);
        await dbAdapter.deleteJob(guildId, jobInstance);
        return {};
    });
    api.post("/checkBotInGuild", async (request) => {
        let guildId = request.body["guildId"];
        return await new DiscordAdapter().checkServer(guildId);
    });
    api.post("/addStorageData", async (request) => {
        let guildId = request.body["guildId"];
        let dataName = request.body["dataName"];
        return await dbAdapter.addStorageData(guildId, dataName);
    });
    api.post("/getAddBotToGuildInvite", async (request) => {
        let guildId = request.body["guildId"];
        let url = "https://discord.com/oauth2/authorize?client_id=1078071216226709525&permissions=2080374975&scope=bot%20applications.commands";
        return { url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=${process.env.discord_oauth_redirectUrl}` };
    });
    api.post("/getGuildJobs", async (request) => {
        let guildId = request.body["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        // we need to add the metadata!
        let jobs = [];
        let storage = {};
        if (guild) {
            storage = guild[STORAGE];
            for (let job of guild.jobs) {
                // map does not work?
                // guild.jobs = guild.jobs.map(el => PipelineFactory.createJob(el))
                // @ts-ignore
                jobs.push(PipelineFactory.createJob(job));
            }
        }
        return {
            storage,
            jobs
        };
    });
    api.post("/saveJob", async (request) => {
        let guildId = request.body["guildId"];
        let rawJob = request.body["job"];
        let jobInstance = PipelineFactory.createJob(rawJob);
        await dbAdapter.saveJob(guildId, jobInstance);
        return {};
    });
    api.post("/getAvailableEventNames", async () => {
        return {
            links: [
                PipelineFactory.getEventByName(ChainLinkTypes.Event.MessageCreate),
                PipelineFactory.getEventByName(ChainLinkTypes.Event.MessageReactionAdd),
                PipelineFactory.getEventByName(ChainLinkTypes.Event.VoiceStateUpdate),
                PipelineFactory.getEventByName(ChainLinkTypes.Event.ChannelCreate),
                PipelineFactory.getEventByName(ChainLinkTypes.Event.GuildMemberAdd)
            ]
        };
    });
    api.post("/getAvailableJobConditions", async () => {
        return {
            links: [
                PipelineFactory.getConditionByName(ChainLinkTypes.Condition.IsMe),
                PipelineFactory.getConditionByName(ChainLinkTypes.Condition.Equals),
                PipelineFactory.getConditionByName(ChainLinkTypes.Condition.MatchesRegex),
            ]
        };
    });
    api.post("/getAvailableJobTasks", async () => {
        return {
            links: [
                PipelineFactory.getTaskByName(ChainLinkTypes.Task.BanUser),
                PipelineFactory.getTaskByName(ChainLinkTypes.Task.SendMessage),
                PipelineFactory.getTaskByName(ChainLinkTypes.Task.IncreaseCounter),
            ]
        };
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