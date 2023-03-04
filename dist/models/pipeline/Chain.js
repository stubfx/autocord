import { ChainLinkTypes } from "./chain/ChainLinkTypes.js";
export class Chain {
    storage = {};
    chainLinks = [];
    constructor(storage) {
        this.storage = storage;
    }
    async run(guildInterface) {
        for (let chainLink of this.chainLinks) {
            let taskResult;
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.EVENT:
                    // skip the event.
                    taskResult = true;
                    break;
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildInterface, this.storage);
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildInterface, this.storage);
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