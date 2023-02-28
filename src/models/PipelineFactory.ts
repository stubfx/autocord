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
import {ChainLinkParam} from "./ChainLinkInterface.js";
import {Equals} from "./pipeline/conditions/Equals.js";
import {MatchesRegex} from "./pipeline/conditions/MatchesRegex.js";
import {AggregatedGuildInterface} from "./GuildInterface";
import {IncreaseCounter} from "./pipeline/tasks/IncreaseCounter.js";

export class PipelineFactory {

    static createJob(jobInterface: JobInterface, storageData: any = {}, guild: AggregatedGuildInterface = null) : Job{
        let job = new Job(jobInterface.id, jobInterface.name, storageData, guild)
        PipelineFactory.validateJob(jobInterface)
        for (let chainElement of jobInterface.chain.chainLinks) {
            job.addChainLink(PipelineFactory.getChainLink(
                ChainLinkTypes.LinkType[chainElement.type],
                chainElement.name, chainElement.params)
            )
        }
        return job
    }

    static validateJob(jobInterface: JobInterface) {
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
        if (jobInterface.chain.chainLinks.length > 5) {
            throw new Error("Exceeded maximum chain length for this job.")
        }
    }

    static getChainLink(type: ChainLinkTypes.LinkType, name: string, params: ChainLinkParam[] = []) : ChainLink<any> {
        // TODO check if params match the actual chainLink to avoid db exploitation
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
            case ChainLinkTypes.Task.IncreaseCounter:
                return new IncreaseCounter(params)
            default:
                throw new Error(`Unknown task name: ${chainLinkTaskName}`)
        }
    }

    static getConditionByName(chainLinkConditionName: string, params: ChainLinkParam[] = []) : Condition {
        switch (chainLinkConditionName) {
            case ChainLinkTypes.Condition.IsMe:
                return new IsMe(params)
            case ChainLinkTypes.Condition.Equals:
                return new Equals(params)
            case ChainLinkTypes.Condition.MatchesRegex:
                return new MatchesRegex(params)
            default:
                throw new Error(`Unknown condition name: ${chainLinkConditionName}`)
        }
    }

}