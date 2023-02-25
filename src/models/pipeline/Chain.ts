import {ChainLink} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult";
import * as LoggerHelper from "../../loggerHelper.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export class Chain {

    private guildId : string

    private store: any

    public chainLinks: Array<ChainLink> = []

    async run(guildId: string) {
        for (let chainLink of this.chainLinks) {
            let taskResult : TaskResult
            console.log(chainLink.type)
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.exec(guildId)
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.exec(guildId)
            }
            if (!taskResult.result) {
                LoggerHelper.dev("ENDING CHAIN")
                break;
            }
        }
    }

    addLink(chainLink: ChainLink) {
        this.chainLinks.push(chainLink)
    }

}