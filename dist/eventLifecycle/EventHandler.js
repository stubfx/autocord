import * as dbAdapter from "../dbAdapter.js";
import { PipelineFactory } from "../models/PipelineFactory.js";
export var DiscordEvents;
(function (DiscordEvents) {
    DiscordEvents["MESSAGE_EVENT"] = "MESSAGE_EVENT";
})(DiscordEvents || (DiscordEvents = {}));
export async function runEventForGuilds(eventName) {
    let guilds = await dbAdapter.getAllGuildsListeningForEvent(eventName);
    for (let guild of guilds) {
        for (let job of guild.jobs) {
            // find the right job
            if (job.firedOn === eventName) {
                // found it!
                PipelineFactory.createJob(job).run();
            }
        }
    }
}
//# sourceMappingURL=EventHandler.js.map