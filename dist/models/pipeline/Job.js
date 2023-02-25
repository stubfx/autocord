import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    firedOn;
    chain = new Chain();
    constructor(id, name, event) {
        this.id = id;
        this.name = name;
        this.firedOn = event;
    }
    setFiredOn(eventName) {
        this.firedOn = eventName;
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
                params: chainLink.params,
                type: chainLink.type
            });
        }
        return {
            id: this.id,
            name: this.name,
            firedOn: this.firedOn,
            chain: chain
        };
    }
}
//# sourceMappingURL=Job.js.map