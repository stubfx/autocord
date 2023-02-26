import { DiscordAdapter } from "../DiscordAdapter.js";
import * as sessionV from "../sessionVariables.js";
import * as dbAdapter from "../dbAdapter.js";
import { PipelineFactory } from "../models/PipelineFactory.js";
import * as LoggerHelper from "../loggerHelper.js";
import { MessageCreate } from "../models/pipeline/Events/MessageCreate.js";
import { IsMe } from "../models/pipeline/conditions/IsMe.js";
import { BanUser } from "../models/pipeline/tasks/BanUser.js";
import { SendMessage } from "../models/pipeline/tasks/SendMessage.js";
export default function (api, opts, done) {
    api.addHook('preHandler', async (request, reply) => {
        console.log(JSON.stringify(request.cookies));
        if (!request.session[sessionV.AUTHENTICATED]) {
            reply.code(401);
            return null;
        }
        let guildId = request.body["guildId"];
        if (guildId) {
            // if the body contains a guild id, check it.
            try {
                // check if the user is actually the owner of the guild passed as param
                if (!request.session.ownedGuilds.includes(guildId)) {
                    reply.code(401);
                    return;
                }
            }
            catch (e) {
                LoggerHelper.error(e);
                reply.code(401);
                return;
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
    api.post("/checkBotInGuild", async (request) => {
        let guildId = request.body["guildId"];
        return await new DiscordAdapter().checkServer(guildId);
    });
    api.post("/getAddBotToGuildInvite", async (request) => {
        let guildId = request.body["guildId"];
        let url = "https://discord.com/oauth2/authorize?client_id=1078071216226709525&permissions=2080374975&scope=bot%20applications.commands";
        return { url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=http://localhost:3000/login` };
    });
    api.post("/getGuildJobs", async (request) => {
        let guildId = request.body["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        return {
            jobs: guild ? guild.jobs : []
        };
    });
    api.post("/saveJob", async (request) => {
        let guildId = request.body["guildId"];
        let rawJob = request.body["job"];
        let jobInstance = PipelineFactory.createJob(rawJob);
        await dbAdapter.saveJob(guildId, jobInstance);
        return {};
    });
    api.post("/getAvailableEventNames", async (request) => {
        return {
            links: [
                new MessageCreate(),
                new MessageCreate(),
                new MessageCreate(),
                new MessageCreate(),
                new MessageCreate()
            ]
        };
    });
    api.post("/getAvailableJobConditions", async (request) => {
        return {
            links: [
                new IsMe()
            ]
        };
    });
    api.post("/getAvailableJobTasks", async (request) => {
        return {
            links: [
                new BanUser(),
                new SendMessage(),
                new BanUser(),
                new SendMessage(),
                new BanUser(),
                new SendMessage(),
                new BanUser(),
                new SendMessage(),
                new BanUser(),
                new SendMessage()
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