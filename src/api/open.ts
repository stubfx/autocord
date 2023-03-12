import {ChainLinkTypes} from "../models/pipeline/chain/ChainLinkTypes.js";
import {JobFactory} from "../models/JobFactory.js";
import {discordClient} from "../discordbot.js";
import {ChainLink} from "../models/pipeline/chain/ChainLink.js";
import {AppDataHandler} from "../appDataHandler.js";


export default function (api, opts, done) {

    api.post("/getBotGuildCount", async () => {
        return {
            guildCount: discordClient.guilds.cache.size,
            userCount: discordClient.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
            eventCount: await AppDataHandler.getEventCount()
        }
    })

    api.get("/help", async (request, reply) => {
        reply.redirect("/help.html")
    })

    api.post("/getAvailableEventNames", async (): Promise<{ links: Array<ChainLink<any>> }> => {
        return {
            links: Object.keys(ChainLinkTypes.IDs.Event).map(el => JobFactory.getEventById(el))
        }
    })

    api.post("/getAvailableJobSuperTasks", async (): Promise<{ links: Array<ChainLink<any>> }> => {
        return {
            links: Object.keys(ChainLinkTypes.IDs.SuperTask).map(el => JobFactory.getSuperTasksById(el))
        }
    })

    api.post("/getAvailableJobConditions", async (): Promise<{ links: Array<ChainLink<any>> }> => {
        return {
            links: Object.keys(ChainLinkTypes.IDs.Condition).map(el => JobFactory.getConditionById(el))
        }
    })

    api.post("/getAvailableJobTasks", async (): Promise<{ links: Array<ChainLink<any>> }> => {
        return {
            links: Object.keys(ChainLinkTypes.IDs.Task).map(el => JobFactory.getTaskById(el))
        }
    })

    done()
}