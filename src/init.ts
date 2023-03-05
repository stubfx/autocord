import * as discordBot from "./discordbot.js";
import * as fastify from "./fastify.js";
import * as dbAdapter from "./db/dbAdapter.js";
import * as DiscordAdapter from "./DiscordAdapter.js";
import * as DiscordEventHandler from "./eventLifecycle/DiscordEventHandler.js";
import updateCommands from "./commandHandler.js";
import {LoggerHelper} from "./loggerHelper.js";
import {ClockEmitter} from "./eventLifecycle/customEmitters/ClockEmitter.js";

discordBot.init(async (client) => {
    LoggerHelper.init(client)
    await dbAdapter.init()
    DiscordAdapter.init(client)
    await fastify.init()
    await updateCommands(client)
    DiscordEventHandler.init(client)
    new ClockEmitter()
})