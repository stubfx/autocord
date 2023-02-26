import { Job } from "./pipeline/Job.js";
import { SendMessage } from "./pipeline/tasks/SendMessage.js";
import { BanUser } from "./pipeline/tasks/BanUser.js";
import { IsMe } from "./pipeline/conditions/IsMe.js";
export class PipelineFactory {
    static createJob(jobInterface) {
        let job = new Job(jobInterface.id, jobInterface.name);
        for (let chainElement of jobInterface.chain) {
            job.addChainLink(PipelineFactory.getChainLinkByName(chainElement.type, chainElement.name));
        }
        return job;
    }
    static getChainLinkByName(type, name) {
        switch (type.toUpperCase()) {
            case "CONDITION":
                return this.getConditionByName(name);
            case "TASK":
                return this.getTaskByName(name);
            default:
                throw new Error(`Unknown chain type: ${type}`);
        }
    }
    static getTaskByName(name) {
        switch (name.toUpperCase()) {
            case "SENDMESSAGE":
                return new SendMessage();
            case "BANUSER":
                return new BanUser();
            default:
                throw new Error(`Unknown task name: ${name}`);
        }
    }
    static getConditionByName(name) {
        switch (name.toUpperCase()) {
            case "ISME":
                return new IsMe();
            default:
                throw new Error(`Unknown condition name: ${name}`);
        }
    }
}
//# sourceMappingURL=PipelineFactory.js.map