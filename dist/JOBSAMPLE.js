import { Job } from "./models/pipeline/Job.js";
import { SendMessage } from "./models/pipeline/tasks/SendMessage.js";
import { BanUser } from "./models/pipeline/tasks/BanUser.js";
import { IsMe } from "./models/pipeline/conditions/IsMe.js";
import { ChainLinkTypes } from "./models/pipeline/chain/ChainLinkTypes.js";
export function getSampleJob() {
    // define job
    let job = new Job(null, "JOB " + (new Date().getTime()).toString(), ChainLinkTypes.Event.MessageCreate);
    job.addChainLink(new SendMessage());
    job.addChainLink(new IsMe());
    job.addChainLink(new BanUser());
    if (Math.random() > 0.7) {
        job.addChainLink(new SendMessage());
    }
    return job;
}
//# sourceMappingURL=JOBSAMPLE.js.map