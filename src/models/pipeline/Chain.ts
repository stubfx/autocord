import {ChainLink} from "./chain/ChainLink.js";
import {ChainLinkTypes} from "./chain/ChainLinkTypes.js";
import {AggregatedGuildInterface} from "../GuildInterface";

export class Chain {

    private readonly storage : any = {}
    private readonly vault : any = {}

    public chainLinks: Array<ChainLink<any>> = []

    constructor(storage: any, vault: any) {
        this.storage = storage
        this.vault = vault
    }

    async run(guildInterface: AggregatedGuildInterface) {
        for (let chainLink of this.chainLinks) {
            let taskResult : Boolean
            switch (chainLink.type) {
                case ChainLinkTypes.LinkType.EVENT:
                    // skip the event.
                    taskResult = true
                    break;
                case ChainLinkTypes.LinkType.CONDITION:
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault)
                    break;
                case ChainLinkTypes.LinkType.TASK:
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault)
                    break
                case ChainLinkTypes.LinkType.SUPERTASK:
                    taskResult = await chainLink.run(guildInterface, this.storage, this.vault)
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