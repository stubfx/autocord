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