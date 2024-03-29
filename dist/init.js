import * as discordBot from "./discordbot.js";
import * as fastify from "./fastify.js";
import * as dbAdapter from "./db/dbAdapter.js";
import * as DiscordAdapter from "./DiscordAdapter.js";
import * as DiscordEventHandler from "./eventLifecycle/DiscordEventHandler.js";
import * as CommandHandler from "./commandHandler.js";
import { LoggerHelper } from "./loggerHelper.js";
import { ClockEmitter } from "./eventLifecycle/customEmitters/ClockEmitter.js";
import { injectPrototypes } from './prototypeManipulation.js';
import { AppDataHandler } from "./appDataHandler.js";
discordBot.init(async (client) => {
    injectPrototypes();
    LoggerHelper.init(client);
    AppDataHandler.init();
    await dbAdapter.init();
    DiscordAdapter.init(client);
    await fastify.init();
    await CommandHandler.init();
    DiscordEventHandler.init(client);
    new ClockEmitter();
});
//# sourceMappingURL=init.js.map