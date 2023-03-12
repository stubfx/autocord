import { Chain } from "./Chain.js";
export class Job {
    id;
    name;
    chain;
    cost = 0;
    ERROR = false;
    guild;
    storage;
    vault; // this is MUST NOT BE accessible by users.
    constructor(id, name, storageData = {}, vault = {}, guild = null) {
        this.id = id;
        this.name = name;
        this.storage = storageData || {};
        this.vault = vault || {};
        this.chain = new Chain(this.storage, this.vault);
        this.guild = guild;
    }
    getRequiredPermissionBitFields() {
        let permissions = [];
        for (let chainLink of this.chain.chainLinks) {
            permissions.push(...chainLink.requiredPermissions);
        }
        return permissions;
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
    isValid() {
        for (let chainLink of this.getChainLinks()) {
            if (!chainLink.validate()) {
                this.ERROR = true;
                return false;
            }
        }
        return true;
    }
    toJobInterface() {
        let chainLinks = [];
        for (let chainLink of this.chain.chainLinks) {
            chainLinks.push({
                id: chainLink.id,
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