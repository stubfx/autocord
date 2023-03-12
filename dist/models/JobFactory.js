import { Job } from "./pipeline/Job.js";
import { ChainLinkTypes } from "./pipeline/chain/ChainLinkTypes.js";
import { ConditionDict } from "./pipeline/dictionaries/conditionDict.js";
import { TaskDict } from "./pipeline/dictionaries/taskDict.js";
import { EventDict } from "./pipeline/dictionaries/eventDict.js";
import { SuperTasksDict } from "./pipeline/dictionaries/superTasksDict.js";
import { UnknownChainLink } from "./pipeline/chain/UnknownChainLink.js";
const conditionDict = new ConditionDict();
const taskDict = new TaskDict();
const eventDict = new EventDict();
const superTasksDict = new SuperTasksDict();
export class JobFactory {
    /**
     * this method allows for error as it's supposed to return the job flagged as "ERROR" in case is not compliant.
     * Doing this, we are able to create new events and remove old one notifying the users that the actual job is broken
     * as it won't be run anymore.
     * @param jobInterface
     */
    static createJobForInterface(jobInterface) {
        let job = new Job(jobInterface.id, jobInterface.name);
        for (let chainElement of jobInterface.chain.chainLinks) {
            let chainLink = JobFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.id, chainElement.params);
            job.addChainLink(chainLink);
        }
        return job;
    }
    static createJob(jobInterface, storageData = {}, vault = {}, guild = null) {
        let job = new Job(jobInterface.id, jobInterface.name, storageData, vault, guild);
        JobFactory.validateJobInterface(jobInterface);
        // here the job is guaranteed to be ok. (should have exploded otherwise.)
        for (let chainElement of jobInterface.chain.chainLinks) {
            let chainLink = JobFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.id, chainElement.params);
            job.addChainLink(chainLink);
        }
        return job;
    }
    static validateJobInterface(jobInterface) {
        if (!jobInterface.name || jobInterface.name.length < 3 || jobInterface.name.length > 80) {
            throw new Error("Job name error.");
        }
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
            throw new Error("This job has more/less than 1 event in the chain");
        }
        if (jobInterface.chain.chainLinks.length > +process.env.MAX_JOB_LINKS) {
            throw new Error("Exceeded maximum chain length for this job.");
        }
        let jobCost = 0;
        for (let chainElement of jobInterface.chain.chainLinks) {
            // for each chainLink in the interface
            // we should create the chainLink instance, then check if it is actually valid.
            let chainLink = JobFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.id, chainElement.params);
            // chainLink is created, but is it valid?
            if (!chainLink.validate()) {
                throw Error('ChainLink is not valid.');
            }
            // remember to add the cost as well, we need to check even that at the end of the day.
            jobCost += chainLink.cost;
            if (jobCost > +process.env.MAX_JOB_COST) {
                throw new Error(`Job is too expensive: ${jobCost}`);
            }
        }
    }
    static getChainLink(type, id, params = []) {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventById(id, params);
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionById(id, params);
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskById(id, params);
            case ChainLinkTypes.LinkType.SUPERTASK:
                return this.getSuperTasksById(id, params);
            default:
                return new UnknownChainLink();
        }
    }
    static getEventById(chainLinkId, params = []) {
        return eventDict.getById(chainLinkId, params);
    }
    static getTaskById(chainLinkId, params = []) {
        return taskDict.getById(chainLinkId, params);
    }
    static getConditionById(chainLinkId, params = []) {
        return conditionDict.getById(chainLinkId, params);
    }
    static getSuperTasksById(chainLinkId, params = []) {
        return superTasksDict.getById(chainLinkId, params);
    }
}
//# sourceMappingURL=JobFactory.js.map