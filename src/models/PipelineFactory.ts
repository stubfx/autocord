import {JobInterface} from "./JobInterface.js";
import {Job} from "./pipeline/Job.js";
import {ChainLink} from "./pipeline/chain/ChainLink.js";
import {SendMessage} from "./pipeline/tasks/SendMessage.js";
import {BanUser} from "./pipeline/tasks/BanUser.js";
import {Condition} from "./pipeline/Condition.js";
import {IsMe} from "./pipeline/conditions/IsMe.js";
import {Task} from "./pipeline/Task.js";

export class PipelineFactory {

    static createJob(jobInterface: JobInterface) : Job {
        let job = new Job(jobInterface.name, jobInterface.firedOn)
        for (let chainElement of jobInterface.chain) {
            job.addChainLink(PipelineFactory.getChainLinkByName(chainElement.type, chainElement.name))
        }
        return job
    }

    static getChainLinkByName(type: string, name: string) : ChainLink {
        switch (type.toUpperCase()) {
            case "CONDITION":
                return this.getConditionByName(name)
            case "TASK":
                return this.getTaskByName(name)
            default:
                throw new Error(`Unknown chain type: ${type}`)
        }
    }

    private static getTaskByName(name: string) : Task {
        switch (name.toUpperCase()) {
            case "SENDMESSAGE":
                return new SendMessage()
            case "BANUSER":
                return new BanUser()
            default:
                throw new Error(`Unknown task name: ${name}`)
        }
    }

    private static getConditionByName(name: string) : Condition {
        switch (name.toUpperCase()) {
            case "ISME":
                return new IsMe()
            default:
                throw new Error(`Unknown condition name: ${name}`)
        }
    }

}