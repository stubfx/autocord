import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    chain;
    cost = 0;
    guild;
    storage;
    constructor(id, name, storageData = {}, guild = null) {
        this.id = id;
        this.name = name;
        this.storage = storageData || {};
        this.chain = new Chain(this.storage);
        this.guild = guild;
    }
    addChainLink(chainLink) {
        this.chain.addLink(chainLink);
        this.cost += 1;
    }
    getChainLinks() {
        return this.chain.chainLinks;
    }
    async run() {
        await this.chain.run(this.guild);
    }
    toJobInterface() {
        let chainLinks = [];
        for (let chainLink of this.chain.chainLinks) {
            chainLinks.push({
                name: chainLink.name,
                params: chainLink.params,
                type: chainLink.type
            });
        }
        return {
            id: this.id,
            name: this.name,
            chain: {
                chainLinks: chainLinks
            }
        };
    }
}
//# sourceMappingURL=Job.js.map