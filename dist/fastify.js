import fetch from "node-fetch";
import path from "path";
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyRateLimit from '@fastify/rate-limit';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import { getSessionExpirationDate } from "./utils.js";
import authApi from './api/auth.js';
import * as sessionV from "./sessionVariables.js";
import * as LoggerHelper from "./loggerHelper.js";
import cors from '@fastify/cors';
import { DiscordAdapter } from "./DiscordAdapter.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
export async function init() {
    const fastify = Fastify({
        logger: false
    });
    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        secret: process.env.secret,
        cookie: {
            domain: !process.env.dev ? 'autocord.io' : 'localhost',
            expires: getSessionExpirationDate(),
            secure: "auto",
            // sameSite: !process.env.dev ? "strict" : "none"
        }
    });
    fastify.register(cors, {
        // put your options here
        methods: ['POST', "GET"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
        origin: process.env.redirectUrl
    });
    await fastify.register(fastifyRateLimit, {
        global: true,
        max: 30,
        timeWindow: 1000,
        // allowList: ['127.0.0.1']
    });
    fastify.setNotFoundHandler({
        preHandler: fastify.rateLimit()
    }, function (request, reply) {
        reply.code(404).send('There you go: https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, "/site"),
        prefix: "/", // optional: default '/'
    });
    fastify.addHook('preSerialization', async (request, reply, payload) => {
        if (reply.statusCode === 500) {
            // do not send the error to avoid api spoofing.
            LoggerHelper.error(payload.toString());
            return {};
        }
        return payload;
    });
    fastify.register(authApi, { prefix: '/auth' });
    fastify.get('/close', (request, reply) => {
        reply.headers({
            "Content-Type": 'text/html'
        });
        reply.send(`<script>
          window.close();
        </script>
        <p>You can now close this window.</p>`);
    });
    fastify.post("/logincheck", async (request) => {
        return { result: !!request.session[sessionV.AUTHENTICATED] };
    });
    fastify.post("/getDiscordLoginUrl", async () => {
        // redirect the browser to the discord login!
        let redirectUri = process.env.discord_oauth_redirectUrl;
        return { url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.discord_application_id}&response_type=code&scope=identify%20guilds&redirect_uri=${redirectUri}` };
    });
    fastify.get("/login", async (request, reply) => {
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
                    reply.redirect(`${process.env.redirectUrl}/discordLogin`);
                    return;
                }
                const oauthData = await tokenResponseData.json();
                // let tokenType = `${oauthData["token_type"]}`
                let accessToken = `${oauthData["access_token"]}`;
                request.session[sessionV.AUTHENTICATED] = true;
                request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN] = accessToken;
                let userinfo = await new DiscordAdapter(request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN]).getUserInfo();
                LoggerHelper.success(`User login: ${userinfo.username} (${userinfo.id})`);
            }
            catch (error) {
                // NOTE: An unauthorized token will not throw an error
                // tokenResponseData.statusCode will be 401
                console.error(error);
            }
        }
        // after login, send the user to the guild selection
        reply.redirect(`${process.env.redirectUrl}/close`);
        return;
    });
    fastify.get("/help", async (request, reply) => {
        reply.redirect("/help.html");
    });
    // Run the server and report out to the logs
    fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Http server ready.`);
    });
}
//# sourceMappingURL=fastify.js.map