import * as discordBot from "./discordbot.js";
import fetch from "node-fetch";
// Require the framework and instantiate it
/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */
import path from "path";
// Require the fastify framework and instantiate it
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyJwt from "@fastify/jwt";
import authApi from './api/auth.js';
import { DiscordApi } from "./discordApi.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({
    logger: true
});
fastify.register(fastifyJwt, {
    secret: "81cc5b17018674b401b42fe46546wrewr23424232asdf435fgdfgedntertnerngrerasdfasdfasdhtyr45646456456ge658da1577e3e646877",
    sign: {
        expiresIn: '10h'
    }
});
// Setup our static files
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../site/dist"),
    prefix: "/", // optional: default '/'
});
fastify.register(authApi, { prefix: '/auth' });
fastify.get("/login", async (request, reply) => {
    let code = request.query["code"];
    if (code) {
        try {
            const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: process.env.clientId,
                    client_secret: process.env.clientSecret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: process.env.redirectUrl
                }).toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const oauthData = await tokenResponseData.json();
            // let tokenType = `${oauthData["token_type"]}`
            let accessToken = `${oauthData["access_token"]}`;
            console.log(accessToken);
            let userinfo = await new DiscordApi(accessToken).getUserInfo();
            let jwt = fastify.jwt.sign({ userId: userinfo.id });
            reply.redirect(`/index.html?sx=${jwt}`);
            return;
        }
        catch (error) {
            // NOTE: An unauthorized token will not throw an error
            // tokenResponseData.statusCode will be 401
            console.error(error);
        }
    }
    reply.code(401);
    return null;
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
discordBot.initBot();
//# sourceMappingURL=server.js.map