import {Chain} from "./Chain.js";
import {ChainLink} from "./chain/ChainLink.js";
import {JobInterface} from "../JobInterface.js";
import {ChainLinkInterface} from "../ChainLinkInterface";
import {AggregatedGuildInterface} from "../GuildInterface";

export class Job {
    readonly id: string
    readonly name: string
    private chain: Chain

    private cost: number = 0

    private readonly guild: AggregatedGuildInterface

    private readonly storage: any
    private readonly vault: any // this is MUST NOT BE accessible by users.

    constructor(id: string, name: string, storageData: any = {}, vault: any = {}, guild: AggregatedGuildInterface = null) {
        this.id = id
        this.name = name
        this.storage = storageData || {}
        this.vault = vault || {}
        this.chain = new Chain(this.storage, this.vault)
        this.guild = guild
    }

    public getRequiredPermissionBitFields() {
        let permissions = []
        for (let chainLink of this.chain.chainLinks) {
            permissions.push(...chainLink.requiredPermissions)
        }
        return permissions
    }

    addChainLink(chainLink: ChainLink<any>) {
        this.chain.addLink(chainLink)
        this.cost += 1
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