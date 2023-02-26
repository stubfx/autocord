export class ChainLink {
    name;
    type;
    description = "Missing description :P";
    params = [];
    run(guildId, ...args) {
        return this.behavior();
    }
}
//# sourceMappingURL=ChainLink.js.map