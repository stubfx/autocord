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

export class PipelineFactory {

    static createJob(jobInterface: JobInterface) : Job{
        let job = new Job(jobInterface.id, jobInterface.name)
        for (let chainElement of jobInterface.chain) {
            job.addChainLink(PipelineFactory.getChainLinkByName(chainElement.type, chainElement.name))
        }
        return job
    }

    static getChainLinkByName(type: string, name: string) : ChainLink {
        switch (type) {
            case ChainLinkTypes.LinkType.EVENT:
                return this.getEventByName(name)
            case ChainLinkTypes.LinkType.CONDITION:
                return this.getConditionByName(name)
            case ChainLinkTypes.LinkType.TASK:
                return this.getTaskByName(name)
            default:
                throw new Error(`Unknown chain type: ${type}`)
        }
    }

    private static getEventByName(name: string) : EventLink {
        switch (name) {
            case ChainLinkTypes.Event.MessageCreate:
                return new MessageCreate()
            case ChainLinkTypes.Event.VoiceStateUpdate:
                return new VoiceStateUpdate()
            case ChainLinkTypes.Event.ChannelCreate:
                return new ChannelCreate()
            case ChainLinkTypes.Event.GuildMemberAdd:
                return new GuildMemberAdd()
            case ChainLinkTypes.Event.MessageReactionAdd:
                return new MessageReactionAdd()
            default:
                throw new Error(`Unknown condition name: ${name}`)
        }
    }

    private static getTaskByName(name: string) : Task {
        switch (name) {
            case ChainLinkTypes.Task.SendMessage:
                return new SendMessage()
            case ChainLinkTypes.Task.BanUser:
                return new BanUser()
            default:
                throw new Error(`Unknown task name: ${name}`)
        }
    }

    private static getConditionByName(name: string) : Condition {
        switch (name) {
            case ChainLinkTypes.Condition.IsMe:
                return new IsMe()
            default:
                throw new Error(`Unknown condition name: ${name}`)
        }
    }

}