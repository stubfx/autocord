import { DiscordAdapter } from "../DiscordAdapter.js";
import * as sessionV from "../sessionVariables.js";
import * as dbAdapter from "../dbAdapter.js";
import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
export default function (api, opts, done) {
    api.decorateRequest('userId', '');
    api.addHook('preHandler', async (request, reply) => {
        console.log(JSON.stringify(request.cookies));
        if (!request.session[sessionV.AUTHENTICATED]) {
            reply.code(401);
            return null;
        }
    });
    api.get("/ownedGuilds", async (request) => {
        let userGuilds = await new DiscordAdapter(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserOwnedGuilds();
        return userGuilds.filter(value => value.owner);
    });
    api.get("/user", async (request) => {
        return await new DiscordAdapter(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserInfo();
    });
    api.get("/checkBotInGuild", async (request) => {
        let guildId = request.query["guildId"];
        return await new DiscordAdapter().checkServer(guildId);
    });
    api.get("/getAddBotToGuildInvite", async (request) => {
        let guildId = request.query["guildId"];
        let url = "https://discord.com/oauth2/authorize?client_id=1078071216226709525&permissions=2080374975&scope=bot%20applications.commands";
        return { url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=http://localhost:3000/login` };
    });
    api.get("/getGuildJobs", async (request) => {
        let guildId = request.query["guildId"];
        let guild = await dbAdapter.getGuild(guildId);
        return {
            jobs: guild.jobs
        };
    });
    api.get("/getAvailableEventNames", async (request) => {
        // let guildId = request.query["guildId"];
        // let guild = await dbAdapter.getGuild(guildId)
        // return {
        //     jobs: guild.jobs
        // }
        return {
            links: [
                {
                    type: ChainLinkTypes.LinkType.EVENT,
                    name: ChainLinkTypes.Event.MessageCreate,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.EVENT,
                    name: ChainLinkTypes.Event.MessageReactionAdd,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.EVENT,
                    name: ChainLinkTypes.Event.ChannelCreate,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.EVENT,
                    name: ChainLinkTypes.Event.VoiceStateUpdate,
                    params: ["1", "1", "1", "1", "1"]
                }
            ]
        };
    });
    api.get("/getAvailableJobConditions", async (request) => {
        // let guildId = request.query["guildId"];
        // let guild = await dbAdapter.getGuild(guildId)
        // return {
        //     jobs: guild.jobs
        // }
        return {
            links: [
                {
                    type: ChainLinkTypes.LinkType.CONDITION,
                    name: ChainLinkTypes.Condition.IsMe,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.CONDITION,
                    name: ChainLinkTypes.Condition.IsMe,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.CONDITION,
                    name: ChainLinkTypes.Condition.IsMe,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.CONDITION,
                    name: ChainLinkTypes.Condition.IsMe,
                    params: ["1", "1", "1", "1", "1"]
                }
            ]
        };
    });
    api.get("/getAvailableJobTasks", async (request) => {
        // let guildId = request.query["guildId"];
        // let guild = await dbAdapter.getGuild(guildId)
        // return {
        //     jobs: guild.jobs
        // }
        return {
            links: [
                {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                }, {
                    type: ChainLinkTypes.LinkType.TASK,
                    name: ChainLinkTypes.Task.SendMessage,
                    params: ["1", "1", "1", "1", "1"]
                },
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