import {JobInterface} from "./JobInterface.js";
import {Job} from "./pipeline/Job.js";
import {ChainLink} from "./pipeline/chain/ChainLink.js";
import {Condition} from "./pipeline/Condition.js";
import {Task} from "./pipeline/Task.js";
import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";
import {EventLink} from "./pipeline/EventLink.js";
import {ChainLinkParam} from "./ChainLinkInterface.js";
import {AggregatedGuildInterface} from "./GuildInterface.js";
import {ConditionDict} from "./pipeline/dictionaries/conditionDict.js";
import {TaskDict} from "./pipeline/dictionaries/taskDict.js";
import {EventDict} from "./pipeline/dictionaries/eventDict.js";
import {SuperTasksDict} from "./pipeline/dictionaries/superTasksDict.js";
import {SuperTask} from "./pipeline/SuperTask.js";

const conditionDict = new ConditionDict()
const taskDict = new TaskDict()
const eventDict = new EventDict()
const superTasksDict = new SuperTasksDict()

export class JobFactory {

    static createJob(jobInterface: JobInterface, storageData: any = {}, vault: any = {}, guild: AggregatedGuildInterface = null) : Job{
        let job = new Job(jobInterface.id, jobInterface.name, storageData, vault, guild)
        JobFactory.validateJobInterface(jobInterface)
        let jobCost = 0
        for (let chainElement of jobInterface.chain.chainLinks) {
            let chainLink = JobFactory.getChainLink(
                ChainLinkTypes.LinkType[chainElement.type],
                chainElement.name, chainElement.params);
            // REMEMBER TO VALIDATE <3
            // * battlefield theme in background *
            chainLink.validate()
            jobCost += chainLink.cost
            if (jobCost > +process.env.MAX_JOB_COST) {
                throw new Error(`Job is too expensive: ${jobCost}`)
            }
            job.addChainLink(chainLink)
        }
        return job
    }

    static validateJobInterface(jobInterface: JobInterface) {
        if (!jobInterface.name || jobInterface.name.length < 3 || jobInterface.name.length > 80) {
            throw new Error("Job name error.")
        }
        if (jobInterface.chain.chainLinks.length < 2) {
            throw new Error("This job has only 1 item? Only an event?")
        }
        let eventCount = jobInterface.chain.chainLinks.reduce((previousValue, currentValue) => {
            if (currentValue.type === ChainLinkTypes.LinkType.EVENT) {
                return ++previousValue
            }
            return previousValue
        }, 0)
        if (eventCount !== 1) {
            throw new Error("This job has more/less than 1 item in the chain")
        }
        if (jobInterface.chain.chainLinks.length > +process.env.MAX_JOB_LINKS) {
            throw new Error("Exceeded maximum chain length for this job.")
        }
    }

    static getChainLink(type: ChainLinkTypes.LinkType, name: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name, params)
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name, params)
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name, params)
            case ChainLinkTypes.LinkType.SUPERTASK:
                return this.getSuperTasksByName(name, params)
            default:
                throw new Error(`Unknown chain type: ${type}`)
        }
    }

    static getEventByName(chainLinkEventName: string, params: ChainLinkParam[] = []) : EventLink {
        return eventDict.getEventByName(chainLinkEventName, params)

    }

    static getTaskByName(chainLinkTaskName: string, params: ChainLinkParam[] = []) : Task {
        return taskDict.getTaskByName(chainLinkTaskName, params)
    }

    static getConditionByName(chainLinkConditionName: string, params: ChainLinkParam[] = []) : Condition {
        return conditionDict.getConditionByName(chainLinkConditionName, params)
    }

    static getSuperTasksByName(chainLinkEventName: string, params: ChainLinkParam[] = []) : SuperTask {
        return superTasksDict.getTaskByName(chainLinkEventName, params)

    }

}