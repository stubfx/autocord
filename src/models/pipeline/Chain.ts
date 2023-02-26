import {ChainLink} from "./chain/ChainLink.js";
import * as LoggerHelper from "../../loggerHelper.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export class Chain {

    readonly eventArgs : any = {}

    public chainLinks: Array<ChainLink> = []

    constructor(eventArgs: any) {
        this.eventArgs = eventArgs
    }

    async run(guildId: string) {
        for (let chainLink of this.chainLinks) {
            let taskResult : Boolean
            console.log(chainLink.type)
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.EVENT:
                    // skip the event.
                    taskResult = true
                    break;
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildId, this.eventArgs)
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildId, this.eventArgs)
            }
            if (!taskResult) {
                LoggerHelper.dev("ENDING CHAIN")
                break;
            }
        }
    }

    addLink(chainLink: ChainLink) {
        this.chainLinks.push(chainLink)
    }

}