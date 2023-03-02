import * as discordBot from "./discordbot.js";
import * as fastify from "./fastify.js";
import * as dbAdapter from "./dbAdapter.js";
import * as LoggerHelper from "./loggerHelper.js";
import * as DiscordAdapter from "./DiscordAdapter.js";
import * as DiscordEventHandler from "./eventLifecycle/DiscordEventHandler.js";
import updateCommands from "./commandHandler.js";
discordBot.init(async (client) => {
    LoggerHelper.init(client);
    DiscordEventHandler.init(client);
    await dbAdapter.init();
    DiscordAdapter.init(client);
    await fastify.init();
    await updateCommands(client);
});
//# sourceMappingURL=init.js.map