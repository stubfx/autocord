import { Job } from "./pipeline/Job.js";
import { ChainLinkTypes } from "./pipeline/chain/ChainLinkTypes.js";
import { ConditionDict } from "./pipeline/dictionaries/conditionDict.js";
import { TaskDict } from "./pipeline/dictionaries/taskDict.js";
import { EventDict } from "./pipeline/dictionaries/eventDict.js";
const conditionDict = new ConditionDict();
const taskDict = new TaskDict();
const eventDict = new EventDict();
export class JobFactory {
    static createJob(jobInterface, storageData = {}, guild = null) {
        let job = new Job(jobInterface.id, jobInterface.name, storageData, guild);
        JobFactory.validateJobInterface(jobInterface);
        let jobCost = 0;
        for (let chainElement of jobInterface.chain.chainLinks) {
            let chainLink = JobFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.name, chainElement.params);
            // REMEMBER TO VALIDATE <3
            // * battlefield theme in background *
            chainLink.validate();
            jobCost += chainLink.cost;
            if (jobCost > +process.env.JOB_COST) {
                throw new Error(`Job is too expensive: ${jobCost}`);
            }
            job.addChainLink(chainLink);
        }
        return job;
    }
    static validateJobInterface(jobInterface) {
        if (jobInterface.chain.chainLinks.length < 2) {
            throw new Error("This job has only 1 item? Only an event?");
        }
        let eventCount = jobInterface.chain.chainLinks.reduce((previousValue, currentValue) => {
            if (currentValue.type === ChainLinkTypes.LinkType.EVENT) {
                return ++previousValue;
            }
            return previousValue;
        }, 0);
        if (eventCount !== 1) {
            throw new Error("This job has more/less than 1 item in the chain");
        }
        if (jobInterface.chain.chainLinks.length > 5) {
            throw new Error("Exceeded maximum chain length for this job.");
        }
    }
    static getChainLink(type, name, params = []) {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name, params);
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name, params);
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name, params);
            default:
                throw new Error(`Unknown chain type: ${type}`);
        }
    }
    static getEventByName(chainLinkEventName, params = []) {
        return eventDict.getEventByName(chainLinkEventName, params);
    }
    static getTaskByName(chainLinkTaskName, params = []) {
        return taskDict.getTaskByName(chainLinkTaskName, params);
    }
    static getConditionByName(chainLinkConditionName, params = []) {
        return conditionDict.getConditionByName(chainLinkConditionName, params);
    }
}
//# sourceMappingURL=JobFactory.js.map