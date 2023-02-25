import {ChainLink, ChainLinkType} from "./chain/ChainLink.js";
import {TaskResult} from "./TaskResult";
import * as LoggerHelper from "../../loggerHelper.js";

export class Chain {

    private guildId : string

    private store: any

    public chainLinks: Array<ChainLink> = []

    async run(guildId: string) {
        for (let chainLink of this.chainLinks) {
            let taskResult : TaskResult
            console.log(chainLink.type)
            switch (chainLink.type) {
                case ChainLinkType.CONDITION:
                    taskResult = await chainLink.exec(guildId)
                    break;
                case ChainLinkType.TASK:
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