import { Job } from "./pipeline/Job.js";
import { SendMessage } from "./pipeline/tasks/SendMessage.js";
import { BanUser } from "./pipeline/tasks/BanUser.js";
import { ChainLinkTypes } from "./pipeline/chain/ChainLinkTypes.js";
import { MessageCreate } from "./pipeline/Events/MessageCreate.js";
import { VoiceStateUpdate } from "./pipeline/Events/VoiceStateUpdate.js";
import { ChannelCreate } from "./pipeline/Events/ChannelCreate.js";
import { GuildMemberAdd } from "./pipeline/Events/GuildMemberAdd.js";
import { MessageReactionAdd } from "./pipeline/Events/MessageReactionAdd.js";
import { Equals } from "./pipeline/conditions/Equals.js";
import { MatchesRegex } from "./pipeline/conditions/MatchesRegex.js";
import { IncreaseCounter } from "./pipeline/tasks/IncreaseCounter.js";
import { AssignRole } from "./pipeline/tasks/AssignRole.js";
import { AddMessageReaction } from "./pipeline/tasks/AddMessageReaction.js";
import { CreateChannel } from "./pipeline/tasks/CreateChannel.js";
import { DeleteChannel } from "./pipeline/tasks/DeleteChannel.js";
export class PipelineFactory {
    static createJob(jobInterface, storageData = {}, guild = null) {
        let job = new Job(jobInterface.id, jobInterface.name, storageData, guild);
        PipelineFactory.validateJob(jobInterface);
        for (let chainElement of jobInterface.chain.chainLinks) {
            job.addChainLink(PipelineFactory.getChainLink(ChainLinkTypes.LinkType[chainElement.type], chainElement.name, chainElement.params, true));
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
    static getChainLink(type, name, params = [], validate = false) {
        // TODO check if params match the actual chainLink to avoid db exploitation
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name, params, validate);
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name, params, validate);
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name, params, validate);
            default:
                throw new Error(`Unknown chain type: ${type}`);
        }
    }
    static getEventByName(chainLinkEventName, params = [], validate = false) {
        switch (chainLinkEventName) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate(params, validate);
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params, validate);
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate(params, validate);
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd(params, validate);
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd(params, validate);
            default:
                throw new Error(`Unknown condition name: ${chainLinkEventName}`);
        }
    }
    static getTaskByName(chainLinkTaskName, params = [], validate = false) {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage(params, validate);
            case ChainLinkTypes.Task.BanUser:
                return new BanUser(params, validate);
            case ChainLinkTypes.Task.IncreaseCounter:
                return new IncreaseCounter(params, validate);
            case ChainLinkTypes.Task.AssignRole:
                return new AssignRole(params, validate);
            case ChainLinkTypes.Task.AddMessageReaction:
                return new AddMessageReaction(params, validate);
            case ChainLinkTypes.Task.CreateChannel:
                return new CreateChannel(params, validate);
            case ChainLinkTypes.Task.DeleteChannel:
                return new DeleteChannel(params, validate);
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`);
        }
    }
    static getConditionByName(chainLinkConditionName, params = [], validate = false) {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.Equals:
                return new Equals(params, validate);
            case ChainLinkTypes.Condition.MatchesRegex:
                return new MatchesRegex(params, validate);
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`);
        }
    }
}
//# sourceMappingURL=PipelineFactory.js.map