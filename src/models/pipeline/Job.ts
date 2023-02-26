import {Chain} from "./Chain.js";
import {ChainLink} from "./chain/ChainLink.js";
import {JobInterface} from "../JobInterface.js";
import {ChainLinkInterface} from "../ChainLinkInterface";

export class Job {
    readonly id: string
    readonly name: string
    private chain: Chain

    readonly eventArgs: any

    constructor(id: string, name: string, eventArgs: any = {}) {
        this.id = id
        this.name = name
        this.eventArgs = eventArgs || {}
        this.chain = new Chain(this.eventArgs)
    }

    addChainLink(chainLink: ChainLink) {
        this.chain.addLink(chainLink)
    }

    getChainLinks(): Array<ChainLink> {
        return this.chain.chainLinks
    }

    async run(guildId: string) {
        await this.chain.run(guildId)
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