import fetch from "node-fetch";
import * as sessionV from "../sessionVariables.js";
import {DiscordAdapter} from "../DiscordAdapter.js";
import * as LoggerHelper from "../loggerHelper.js";


export default function (api, opts, done) {

    let loginOAuth2 = async (request, reply) => {
        let code = request.query["code"];
        const {type} = request.params;
        let isPopup = type === 'popup'
        if (code) {
            try {
                const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        client_id: process.env.discord_application_id,
                        client_secret: process.env.clientSecret,
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: process.env.discord_oauth_redirectUrl + (isPopup ? '/popup' : '')
                    }).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (tokenResponseData.status === 401) {
                    // well...
                    reply.redirect(`${process.env.redirectUrl}`)
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
        if (isPopup) {
            reply.redirect(`${process.env.redirectUrl}/popup`)
            return
        }
        // in this case the user got redirected here through the discord link from another website
        // possibly a discord bot list
        reply.redirect(`${process.env.redirectUrl}`)
        return
    };

    api.get('/popup', (request, reply) => {
        // close the popup window.
        reply.headers({
            "Content-Type": 'text/html'
        })
        reply.send(`<script>
          window.close();
        </script>
        <p>You can now close this window.</p>`);
    })


    api.get("/login", loginOAuth2)
    api.get("/login/:type", loginOAuth2)

    api.post("/logincheck", async (request) => {
        return {result: !!request.session[sessionV.AUTHENTICATED]}
    })

    api.get("/getDiscordLoginUrl", async () => {
        // redirect the browser to the discord login!
        return {url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.discord_application_id}&response_type=code&scope=identify%20guilds&redirect_uri=${encodeURIComponent(process.env.redirectUrl)}`}
    })

    api.post("/getDiscordLoginPopupUrl", async () => {
        // redirect the browser to the discord login!
        return {url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.discord_application_id}&response_type=code&scope=identify%20guilds&redirect_uri=${encodeURIComponent(process.env.redirectUrl + '/popup')}`}
    })

    done()
}