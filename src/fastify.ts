import fetch from "node-fetch";
import path from "path";
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static';
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import {getSessionExpirationDate} from "./utils.js";
import authApi from './api/auth.js'
import * as sessionV from "./sessionVariables.js";
import * as LoggerHelper from "./loggerHelper.js";
import cors from '@fastify/cors'

const __dirname = dirname(fileURLToPath(import.meta.url));

export function init() {
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
    fastify.register(cors, {
        // put your options here
        methods: ['POST', "GET"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
        origin: process.env.dev ? "http://localhost:5173" : "autocord.io"
    })

    fastify.register(fastifyStatic, {
        root: path.join(__dirname, "../site/dist"),
        prefix: "/dashboard", // optional: default '/'
    });

    fastify.addHook('preSerialization', async (request, reply, payload) => {
        if (reply.statusCode === 500) {
            // do not send the error to avoid api spoofing.
            LoggerHelper.error(payload.toString())
            return null
        }
        return payload
    })

    fastify.register(authApi, {prefix: '/auth'})

    fastify.get("/", async (request, reply) => {
        // redirect the browser to the discord login!
        reply.redirect('https://discord.com/api/oauth2/authorize?client_id=1078071216226709525&response_type=code&scope=identify%20guilds')
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
                request.session[sessionV.DISCORD_AUTHORIZATION_TOKEN] = accessToken
            } catch (error) {
                // NOTE: An unauthorized token will not throw an error
                // tokenResponseData.statusCode will be 401
                console.error(error)
            }
        }
        // after login, send the user to the guild selection
        reply.redirect('http://localhost:5173/selectguild')
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
}