import {JobInterface} from "./JobInterface.js";
import {Job} from "./pipeline/Job";
import {ChainLink} from "./pipeline/chain/ChainLink";
import {SendMessage} from "./pipeline/tasks/SendMessage";
import {BanUser} from "./pipeline/tasks/BanUser";
import {Condition} from "./pipeline/Condition";
import {IsMe} from "./pipeline/conditions/IsMe";
import {Task} from "./pipeline/Task";

export class PipelineFactory {

    createJob(jobInterface: JobInterface) : Job {
        let job = new Job(jobInterface.name)
        for (let chainElement of jobInterface.chain) {
            job.addChainLink(this.getChainLinkByName(chainElement.type, chainElement.name))
        }
        return job
    }

    getChainLinkByName(type: string, name: string) : ChainLink {
        switch (type.toLowerCase()) {
            case "CONDITION":
                return this.getConditionByName(name)
            case "TASK":
                return this.getTaskByName(name)
            default:
                throw new Error(`Unknown chain type: ${type}`)
        }
    }

    private getTaskByName(name: string) : Task {
        switch (name.toLowerCase()) {
            case "sendmessage":
                return new SendMessage()
            case "banuser":
                return new BanUser()
            default:
                throw new Error(`Unknown task name: ${name}`)
        }
    }

    private getConditionByName(name: string) : Condition {
        switch (name.toUpperCase()) {
            case "ISME":
                return new IsMe()
            default:
                throw new Error(`Unknown condition name: ${name}`)
        }
    }

}