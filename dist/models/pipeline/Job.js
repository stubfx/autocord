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
    run(...args) {
        this.chain.run();
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