import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";

export class Chain {

    private readonly store : any = {}

    public chainLinks: Array<ChainLink<any>> = []

    constructor(store: any) {
        this.store = store
    }

    async run(guildId: string) {
        for (let chainLink of this.chainLinks) {
            let taskResult : Boolean
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.EVENT:
                    // skip the event.
                    taskResult = true
                    break;
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildId, this.store)
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildId, this.store)
            }
            if (!taskResult) {
                break;
            }
        }
    }

    addLink(chainLink: ChainLink<any>) {
        this.chainLinks.push(chainLink)
    }

}