import {ChainLink} from "./chain/ChainLink.js";
import * as LoggerHelper from "../../loggerHelper.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export class Chain {

    private guildId : string

    private store: any

    public chainLinks: Array<ChainLink> = []

    async run(guildId: string) {
        for (let chainLink of this.chainLinks) {
            let taskResult : Boolean
            console.log(chainLink.type)
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildId)
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildId)
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