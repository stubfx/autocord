import {Job} from "./models/pipeline/Job.js";
import {SendMessage} from "./models/pipeline/tasks/SendMessage.js";
import {BanUser} from "./models/pipeline/tasks/BanUser.js";
import {IsMe} from "./models/pipeline/conditions/IsMe.js";

export function getSampleJob() {
    // define job
    let job = new Job("JOB NAME")
    job.addChainLink(new SendMessage())
    job.addChainLink(new IsMe())
    job.addChainLink(new BanUser())
    if (Math.random() > 0.5) {
        job.addChainLink(new SendMessage())
    }
    return job;
}

export async function test() {
    let job = getSampleJob();
    job.run()
}