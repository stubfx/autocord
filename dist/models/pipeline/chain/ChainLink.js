export class ChainLink {
    name;
    type;
    description = "Missing description :P";
    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams = [];
    // this holds the actual param data.
    // this will be saved into the db
    params;
    constructor(params = []) {
        this.params = params;
    }
    run(guildId, ...args) {
        return this.behavior();
    }
}
//# sourceMappingURL=ChainLink.js.map