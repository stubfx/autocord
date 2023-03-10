import { ChainLinkTypes } from "./chain/ChainLinkTypes.js";
export class Chain {
    storage = {};
    vault = {};
    chainLinks = [];
    constructor(storage, vault) {
        this.storage = storage;
        this.vault = vault;
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
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault);
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault);
                    break;
                case ChainLinkTypes.LinkType.SUPERTASK:
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault);
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