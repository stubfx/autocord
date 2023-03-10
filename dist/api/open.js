import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
import { JobFactory } from "../models/JobFactory.js";
import { discordClient } from "../discordbot.js";
export default function (api, opts, done) {
    api.post("/getBotGuildCount", async () => {
        return { guildCount: discordClient.guilds.cache.size + 18 };
    });
    api.get("/help", async (request, reply) => {
        reply.redirect("/help.html");
    });
    api.post("/getAvailableEventNames", async () => {
        return {
            links: Object.keys(ChainLinkTypes.Event).map(el => JobFactory.getEventByName(el))
        };
    });
    api.post("/getAvailableJobSuperTasks", async () => {
        return {
            links: Object.keys(ChainLinkTypes.SuperTask).map(el => JobFactory.getSuperTasksByName(el))
        };
    });
    api.post("/getAvailableJobConditions", async () => {
        return {
            links: Object.keys(ChainLinkTypes.Condition).map(el => JobFactory.getConditionByName(el))
        };
    });
    api.post("/getAvailableJobTasks", async () => {
        return {
            links: Object.keys(ChainLinkTypes.Task).map(el => JobFactory.getTaskByName(el))
        };
    });
    done();
}
//# sourceMappingURL=open.js.map