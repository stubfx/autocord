import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    chain;
    eventArgs;
    constructor(id, name, eventArgs = {}) {
        this.id = id;
        this.name = name;
        this.eventArgs = eventArgs || {};
        this.chain = new Chain(this.eventArgs);
    }
    addChainLink(chainLink) {
        this.chain.addLink(chainLink);
    }
    getChainLinks() {
        return this.chain.chainLinks;
    }
    async run(guildId) {
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