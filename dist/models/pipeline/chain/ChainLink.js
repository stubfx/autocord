export class ChainLink {
    name;
    type;
    params;
    run(guildId, ...args) {
        return this.behavior();
    }
}
//# sourceMappingURL=ChainLink.js.map