import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    chain = new Chain();
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addChainLink(chainLink) {
        this.chain.addLink(chainLink);
    }
    getChainLinks() {
        return this.chain.chainLinks;
    }
    async run(guildId, ...args) {
        await this.chain.run(guildId);
    }
    toJobInterface() {
        let chain = [];
        for (let chainLink of this.chain.chainLinks) {
            chain.push({
                name: chainLink.name,
                description: chainLink.description,
                params: chainLink.params,
                type: chainLink.type
            });
        }
        return {
            id: this.id,
            name: this.name,
            chain: chain
        };
    }
}
//# sourceMappingURL=Job.js.map