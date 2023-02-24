import {Chain} from "./Chain.js";
import {ChainLink} from "./chain/ChainLink.js";
import {JobInterface} from "../JobInterface.js";
import {ChainLinkInterface} from "../ChainLinkInterface";

export class Job {

    readonly guildId: string
    readonly name: string
    firedOn: string
    private chain: Chain = new Chain()

    constructor(name: string, event: string) {
        this.name = name
        this.firedOn = event
    }

    setFiredOn(eventName: string) {
        this.firedOn = eventName
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
        let chain: Array<ChainLinkInterface> = []
        for (let chainLink of this.chain.chainLinks) {
            chain.push({
                name: chainLink.name,
                params: chainLink.params,
                type: chainLink.type
            })
        }
        return {
            name: this.name,
            firedOn: this.firedOn,
            chain: chain
        }
    }

}