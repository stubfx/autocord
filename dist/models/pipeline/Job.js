import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    chain;
    guild;
    store;
    constructor(id, name, storageData = {}, guild = null) {
        this.id = id;
        this.name = name;
        this.store = storageData || {};
        this.chain = new Chain(this.store);
        this.guild = guild;
    }
    addChainLink(chainLink) {
        this.chain.addLink(chainLink);
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