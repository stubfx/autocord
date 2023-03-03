import { ChainLinkTypes } from "../models/pipeline/chain/ChainLinkTypes.js";
import { JobFactory } from "../models/JobFactory.js";
import { discordClient } from "../discordbot.js";
import loginApi from "./login.js";
export default function (api, opts, done) {
    api.post("/getBotGuildCount", async () => {
        return { guildCount: discordClient.guilds.cache.size + 7 };
    });
    api.get("/help", async (request, reply) => {
        reply.redirect("/help.html");
    });
    api.post("/getAvailableEventNames", async () => {
        return {
            links: Object.keys(ChainLinkTypes.Event).map(el => JobFactory.getEventByName(el))
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
    api.register(loginApi);
    done();
}
//# sourceMappingURL=open.js.map