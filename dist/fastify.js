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
import openApi from './api/open.js';
import { LoggerHelper } from "./loggerHelper.js";
import cors from '@fastify/cors';
import loginApi from "./api/login.js";
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
    fastify.register(openApi, { prefix: '/api' });
    fastify.register(authApi, { prefix: '/api/auth' });
    fastify.register(loginApi);
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