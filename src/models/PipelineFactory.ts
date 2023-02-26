import {JobInterface} from "./JobInterface.js";
import {Job} from "./pipeline/Job.js";
import {ChainLink} from "./pipeline/chain/ChainLink.js";
import {SendMessage} from "./pipeline/tasks/SendMessage.js";
import {BanUser} from "./pipeline/tasks/BanUser.js";
import {Condition} from "./pipeline/Condition.js";
import {IsMe} from "./pipeline/conditions/IsMe.js";
import {Task} from "./pipeline/Task.js";
import {ChainLinkTypes} from "./pipeline/chain/ChainLinkTypes.js";
import {MessageCreate} from "./pipeline/Events/MessageCreate.js";
import {EventLink} from "./pipeline/EventLink.js";
import {VoiceStateUpdate} from "./pipeline/Events/VoiceStateUpdate.js";
import {ChannelCreate} from "./pipeline/Events/ChannelCreate.js";
import {GuildMemberAdd} from "./pipeline/Events/GuildMemberAdd.js";
import {MessageReactionAdd} from "./pipeline/Events/MessageReactionAdd.js";
import {ChainLinkParam} from "./ChainLinkInterface";

export class PipelineFactory {

    static createJob(jobInterface: JobInterface) : Job{
        let job = new Job(jobInterface.id, jobInterface.name)
        for (let chainElement of jobInterface.chain.chainLinks) {
            job.addChainLink(PipelineFactory.getChainLink(
                ChainLinkTypes.LinkType[chainElement.type],
                chainElement.name, chainElement.params)
            )
        }
        return job
    }

    static getChainLink(type: ChainLinkTypes.LinkType, name: string, params: ChainLinkParam[] = []) : ChainLink {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name, params)
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name, params)
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name, params)
            default:
                throw new Error(`Unknown chain type: ${type}`)
        }
    }

    static getEventByName(chainLinkEventName: string, params: ChainLinkParam[] = []) : EventLink {
        switch (chainLinkEventName) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate(params)
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate(params)
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate(params)
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd(params)
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd(params)
            default:
                throw new Error(`Unknown condition name: ${chainLinkEventName}`)
        }
    }

    static getTaskByName(chainLinkTaskName: string, params: ChainLinkParam[] = []) : Task {
        switch (chainLinkTaskName) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage(params)
            case ChainLinkTypes.Task.BanUser:
                return new BanUser(params)
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`)
        }
    }

    static getConditionByName(chainLinkConditionName: string, params: ChainLinkParam[] = []) : Condition {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.IsMe:
                return new IsMe(params)
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`)
        }
    }

}