import {Chain} from "./Chain.js";
import {ChainLink} from "./chain/ChainLink.js";
import {JobInterface} from "../JobInterface.js";
import {ChainLinkInterface} from "../ChainLinkInterface";

export class Job {
    readonly id: string
    readonly name: string
    private chain: Chain = new Chain()

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }

    addChainLink(chainLink: ChainLink) {
        this.chain.addLink(chainLink)
    }

    getChainLinks(): Array<ChainLink> {
        return this.chain.chainLinks
    }

    async run(guildId: string, ...args) {
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