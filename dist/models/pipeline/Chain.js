import { ChainLinkTypes } from "./chain/ChainLinkTypes.js";
export class Chain {
    store = {};
    chainLinks = [];
    constructor(store) {
        this.store = store;
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
                    taskResult = await chainLink.run(guildId, this.store);
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildId, this.store);
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