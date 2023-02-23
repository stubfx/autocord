import * as discordBot from "./discordbot.js";
import fetch from "node-fetch";

// Require the framework and instantiate it
/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */
import path from "path";
// Require the fastify framework and instantiate it
import Fastify from 'fastify'


import fastifyStatic from '@fastify/static';
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import {getSessionExpirationDate} from "./utils.js";
import authApi from './api/auth.js'
import * as sessionV from "./sessionVariables.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
    logger: false
})

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    secret: process.env.secret,
    cookie: {
        domain: !process.env.dev ? 'autocord.io' : 'localhost',
        expires: getSessionExpirationDate(),
        secure: !process.env.dev,
        // sameSite: !process.env.dev ? "strict" : "none"
    }
});

fastify.addHook('preHandler', (req, reply, done) => {
    reply.header("Access-Control-Allow-Origin", "http://localhost:5173")
    reply.header('Access-Control-Allow-Credentials', true);
    done()
})

// Setup our static files
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../site/dist"),
    prefix: "/dashboard", // optional: default '/'
});

fastify.register(authApi, {prefix: '/auth'})

fastify.get("/", async (request, reply) => {
    // redirect the browser to the discord login!
    reply.redirect('https://discord.com/api/oauth2/authorize?client_id=1078071216226709525&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds')
    return null
})

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
            let accessToken = `${oauthData["access_token"]}`
            request.session[sessionV.AUTHENTICATED] = true
            request.session[sessionV.AUTHORIZATION_TOKEN] = accessToken
            console.log(JSON.stringify(request.cookies))
        } catch (error) {
            // NOTE: An unauthorized token will not throw an error
            // tokenResponseData.statusCode will be 401
            console.error(error)
        }
    }
    reply.redirect('http://localhost:5173/index.html')
    return
})

fastify.get("/help", async (request, reply) => {
    reply.redirect("/help.html")
})

// Run the server and report out to the logs
fastify.listen(
    {port: 3000, host: "0.0.0.0"},
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Http server ready.`);
    }
);

discordBot.initBot()