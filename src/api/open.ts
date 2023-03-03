import fetch from "node-fetch";
import * as sessionV from "../sessionVariables.js";
import {DiscordAdapter} from "../DiscordAdapter.js";
import {EventLink} from "../models/pipeline/EventLink.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {JobFactory} from "../models/JobFactory.js";
import {Condition} from "../models/pipeline/Condition.js";
import {Task} from "../models/pipeline/Task.js";
import * as LoggerHelper from "../loggerHelper.js";
import {discordClient} from "../discordbot.js";


export default function (api, opts, done) {
    api.get('/close', (request, reply) => {
        reply.headers({
            "Content-Type" : 'text/html'
        })
        reply.send(`<script>
          window.close();
        </script>
        <p>You can now close this window.</p>`);
    })

    api.post("/logincheck", async (request) => {
        return {result : !!request.session[sessionV.AUTHENTICATED]}
    })

    api.post("/getDiscordLoginUrl", async () => {
        // redirect the browser to the discord login!
        let redirectUri = process.env.discord_oauth_redirectUrl
        return {url : `https://discord.com/api/oauth2/authorize?client_id=${process.env.discord_application_id}&response_type=code&scope=identify%20guilds&redirect_uri=${redirectUri}`}
    })

    api.get("/login", async (request, reply) => {
        let code = request.query["code"];
        if (code) {
            try {
                const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        client_id: process.env.discord_application_id,
                        client_secret: process.env.clientSecret,
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: process.env.discord_oauth_redirectUrl
                    }).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (tokenResponseData.status === 401) {
                    // well...
                    reply.redirect(`${process.env.redirectUrl}/discordLogin`)
                    return
                }
                const oauthData = await tokenResponseData.json();
                // let tokenType = `${oauthData["token_type"]}`
                let accessToken = `${oauthData["access_token"]}`
                request.session[sessionV.AUTHENTICATED] = true
                request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN] = accessToken
                let userinfo = await new DiscordAdapter(request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN]).getUserInfo()
                LoggerHelper.success(`User login: ${userinfo.username} (${userinfo.id})`)
            } catch (error) {
                // NOTE: An unauthorized token will not throw an error
                // tokenResponseData.statusCode will be 401
                console.error(error)
            }
        }
        // after login, send the user to the guild selection
        reply.redirect(`${process.env.redirectUrl}/close`)
        return
    })

    api.post("/getBotGuildCount", async () => {
        return {guildCount: discordClient.guilds.cache.size + 7}
    })

    api.get("/help", async (request, reply) => {
        reply.redirect("/help.html")
    })

    api.post("/getAvailableEventNames", async (): Promise<{ links: Array<EventLink> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Event).map(el => JobFactory.getEventByName(el))
        }
    })

    api.post("/getAvailableJobConditions", async (): Promise<{ links: Array<Condition> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Condition).map(el => JobFactory.getConditionByName(el))
        }
    })

    api.post("/getAvailableJobTasks", async (): Promise<{ links: Array<Task> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Task).map(el => JobFactory.getTaskByName(el))
        }
    })

    done()
}