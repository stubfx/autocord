import { Job } from "./pipeline/Job.js";
import { SendMessage } from "./pipeline/tasks/SendMessage.js";
import { BanUser } from "./pipeline/tasks/BanUser.js";
import { IsMe } from "./pipeline/conditions/IsMe.js";
import { ChainLinkTypes } from "./pipeline/chain/ChainLinkTypes.js";
import { MessageCreate } from "./pipeline/Events/MessageCreate.js";
import { VoiceStateUpdate } from "./pipeline/Events/VoiceStateUpdate.js";
import { ChannelCreate } from "./pipeline/Events/ChannelCreate.js";
import { GuildMemberAdd } from "./pipeline/Events/GuildMemberAdd.js";
import { MessageReactionAdd } from "./pipeline/Events/MessageReactionAdd.js";
import { Equals } from "./pipeline/conditions/Equals.js";
import { MatchesRegex } from "./pipeline/conditions/MatchesRegex.js";
export class PipelineFactory {
    static createJob(jobInterface, eventArgs = {}) {
        let job = new Job(jobInterface.id, jobInterface.name, eventArgs);
        PipelineFactory.validateJob(jobInterface);
        for (let chainElement of jobInterface.chain.chainLinks) {
            job.addChainLink(PipelineFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.name, chainElement.params));
        }
        return job;
    }
    static validateJob(jobInterface) {
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
        switch (chainLinkEventName) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate(params);
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params);
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate(params);
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd(params);
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd(params);
            default:
                throw new Error(`Unknown condition name: ${chainLinkEventName}`);
        }
    }
    static getTaskByName(chainLinkTaskName, params = []) {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage(params);
            case ChainLinkTypes.Task.BanUser:
                return new BanUser(params);
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`);
        }
    }
    static getConditionByName(chainLinkConditionName, params = []) {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.IsMe:
                return new IsMe(params);
            case ChainLinkTypes.Condition.Equals:
                return new Equals(params);
            case ChainLinkTypes.Condition.MatchesRegex:
                return new MatchesRegex(params);
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`);
        }
    }
}
//# sourceMappingURL=PipelineFactory.js.map