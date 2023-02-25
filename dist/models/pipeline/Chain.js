import { ChainLinkType } from "./chain/ChainLink.js";
import * as LoggerHelper from "../../loggerHelper.js";
export class Chain {
    guildId;
    store;
    chainLinks = [];
    async run(guildId) {
        for (let chainLink of this.chainLinks) {
            let taskResult;
            console.log(chainLink.type);
            switch (chainLink.type) {
                case ChainLinkType.CONDITION:
                    taskResult = await chainLink.exec(guildId);
                    break;
                case ChainLinkType.TASK:
                    taskResult = await chainLink.exec(guildId);
            }
            if (!taskResult.result) {
                LoggerHelper.dev("ENDING CHAIN");
                break;
            }
        }
    }
    addLink(chainLink) {
        this.chainLinks.push(chainLink);
    }
}
//# sourceMappingURL=Chain.js.map