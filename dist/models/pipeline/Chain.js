import * as LoggerHelper from "../../loggerHelper.js";
import { ChainLinkTypes } from "./chain/ChainLinkTypes.js";
export class Chain {
    guildId;
    store;
    eventArgs = {};
    chainLinks = [];
    constructor(eventArgs) {
        this.eventArgs = eventArgs;
    }
    async run(guildId) {
        for (let chainLink of this.chainLinks) {
            let taskResult;
            console.log(chainLink.type);
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.EVENT:
                    // skip the event.
                    taskResult = true;
                    break;
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildId, this.eventArgs);
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildId, this.eventArgs);
            }
            if (!taskResult) {
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