import { Chain } from "./Chain.js";
export class Job {
    guildId;
    name;
    firedOn;
    chain = new Chain();
    constructor(name, event) {
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
            name: this.name,
            firedOn: this.firedOn,
            chain: chain
        };
    }
}
//# sourceMappingURL=Job.js.map