import {Job} from "./models/pipeline/Job.js";
import {SendMessage} from "./models/pipeline/tasks/SendMessage.js";
import {BanUser} from "./models/pipeline/tasks/BanUser.js";
import {IsMe} from "./models/pipeline/conditions/IsMe.js";
import {DiscordEvents} from "./eventLifecycle/EventHandler.js";

export function getSampleJob() {
    // define job
    let job = new Job("JOB " + (new Date().getTime()).toString(), DiscordEvents.MESSAGE_EVENT)
    job.addChainLink(new SendMessage())
    job.addChainLink(new IsMe())
    job.addChainLink(new BanUser())
    if (Math.random() > 0.7) {
        job.addChainLink(new SendMessage())
    }
    return job;
}

export async function test() {
    let job = getSampleJob();
    job.run()
}