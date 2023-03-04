import {Chain} from "./Chain.js";
import {ChainLink} from "./chain/ChainLink.js";
import {JobInterface} from "../JobInterface.js";
import {ChainLinkInterface} from "../ChainLinkInterface";
import {AggregatedGuildInterface} from "../GuildInterface";

export class Job {
    readonly id: string
    readonly name: string
    private chain: Chain

    private readonly guild: AggregatedGuildInterface

    private readonly storage: any

    constructor(id: string, name: string, storageData: any = {}, guild: AggregatedGuildInterface = null) {
        this.id = id
        this.name = name
        this.storage = storageData || {}
        this.chain = new Chain(this.storage)
        this.guild = guild
    }

    addChainLink(chainLink: ChainLink<any>) {
        this.chain.addLink(chainLink)
    }

    getChainLinks(): Array<ChainLink<any>> {
        return this.chain.chainLinks
    }

    async run() {
        await this.chain.run(this.guild)
    }

    toJobInterface(): JobInterface {
        let chainLinks: Array<ChainLinkInterface> = []
        for (let chainLink of this.chain.chainLinks) {
            chainLinks.push({
                name: chainLink.name,
                params: chainLink.params,
                type: chainLink.type
            })
        }
        return {
            id: this.id,
            name: this.name,
            chain: {
                chainLinks: chainLinks
            }
        }
    }

}