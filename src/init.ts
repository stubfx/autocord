import * as discordBot from "./discordbot.js";
import * as fastify from "./fastify.js";
import * as dbAdapter from "./dbAdapter.js";
import * as LoggerHelper from "./loggerHelper.js";
import * as DiscordAdapter from "./DiscordAdapter.js";

discordBot.init(async (client) => {
    LoggerHelper.init(client)
    await dbAdapter.init()
    DiscordAdapter.init(client)
    fastify.init()
})
