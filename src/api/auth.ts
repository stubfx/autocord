import {DiscordAdapter} from "../DiscordAdapter.js";
import * as sessionV from "../sessionVariables.js";
import * as dbAdapter from "../dbAdapter.js";

export default function (api, opts, done) {
    api.decorateRequest('userId', '')
    api.addHook('preHandler', async (request, reply) => {
        console.log(JSON.stringify(request.cookies))
        if (!request.session[sessionV.AUTHENTICATED]) {
            reply.code(401)
            return null
        }
    })

    api.get("/ownedGuilds", async (request) => {
        let userGuilds = await new DiscordAdapter(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserOwnedGuilds();
        return userGuilds.filter(value => value.owner);
    });

    api.get("/user", async (request) => {
        return await new DiscordAdapter(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserInfo();
    })

    api.get("/checkBotInGuild", async (request) => {
        let guildId = request.query["guildId"];
        return await new DiscordAdapter().checkServer(guildId)
    })

    api.get("/getAddBotToGuildInvite", async (request) => {
        let guildId = request.query["guildId"];
        let url = "https://discord.com/oauth2/authorize?client_id=1078071216226709525&permissions=2080374975&scope=bot%20applications.commands";
        return {url: `${url}&guild_id=${guildId}&disable_guild_select=true&response_type=code&redirect_uri=http://localhost:3000/login`}
    })

    api.get("/getGuildJobs", async (request) => {
        let guildId = request.query["guildId"];
        let guild = await dbAdapter.getGuildJobs(guildId)
        return {
            jobs: guild.jobs
        }
    })

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

    done()
}