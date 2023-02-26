import { ChainLinkTypes } from "./chain/ChainLinkTypes.js";
export class Chain {
    eventArgs = {};
    chainLinks = [];
    constructor(eventArgs) {
        this.eventArgs = eventArgs;
    }
    async run(guildId) {
        for (let chainLink of this.chainLinks) {
            let taskResult;
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
                break;
            }
        }
    }
    addLink(chainLink) {
        this.chainLinks.push(chainLink);
    }
}
//# sourceMappingURL=Chain.js.map