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
export class PipelineFactory {
    static createJob(jobInterface) {
        let job = new Job(jobInterface.id, jobInterface.name);
        for (let chainElement of jobInterface.chain) {
            job.addChainLink(PipelineFactory.getChainLinkByName(chainElement.type, chainElement.name));
        }
        return job;
    }
    static getChainLinkByName(type, name) {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name);
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name);
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name);
            default:
                throw new Error(`Unknown chain type: ${type}`);
        }
    }
    static getEventByName(name) {
        switch (name) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate();
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate();
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate();
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd();
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd();
            default:
                throw new Error(`Unknown condition name: ${name}`);
        }
    }
    static getTaskByName(name) {
        switch (name) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage();
            case ChainLinkTypes.Task.BanUser:
                return new BanUser();
            default:
                throw new Error(`Unknown task name: ${name}`);
        }
    }
    static getConditionByName(name) {
        switch (name) {
            case ChainLinkTypes.Condition.IsMe:
                return new IsMe();
            default:
                throw new Error(`Unknown condition name: ${name}`);
        }
    }
}
//# sourceMappingURL=PipelineFactory.js.map