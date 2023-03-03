import {EventLink} from "../models/pipeline/EventLink.js";
import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {JobFactory} from "../models/JobFactory.js";
import {Condition} from "../models/pipeline/Condition.js";
import {Task} from "../models/pipeline/Task.js";
import {discordClient} from "../discordbot.js";
import loginApi from "./login.js";


export default function (api, opts, done) {

    api.post("/getBotGuildCount", async () => {
        return {guildCount: discordClient.guilds.cache.size + 7}
    })

    api.get("/help", async (request, reply) => {
        reply.redirect("/help.html")
    })

    api.post("/getAvailableEventNames", async (): Promise<{ links: Array<EventLink> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Event).map(el => JobFactory.getEventByName(el))
        }
    })

    api.post("/getAvailableJobConditions", async (): Promise<{ links: Array<Condition> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Condition).map(el => JobFactory.getConditionByName(el))
        }
    })

    api.post("/getAvailableJobTasks", async (): Promise<{ links: Array<Task> }> => {
        return {
            links: Object.keys(ChainLinkTypes.Task).map(el => JobFactory.getTaskByName(el))
        }
    })

    api.register(loginApi)

    done()
}