export class ChainLink {
    name;
    type;
    description = "Missing description :P";
    guildId;
    eventArgs = {};
    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams = [];
    // this holds the actual param data.
    // this will be saved into the db
    params;
    constructor(params = []) {
        this.params = params;
    }
    getParam(paramName) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value;
    }
    getEventArg(paramName) {
        return this.eventArgs[paramName];
    }
    resolveStringEmbeds(toResolve) {
        const str = toResolve;
        const regex = /\{\{(\w+)}}/g;
        return str.replace(regex, (match, variable) => {
            return this.getEventArg(variable) || match;
        });
    }
    run(guildId, eventArgs) {
        this.guildId = guildId;
        this.eventArgs = eventArgs || {};
        return this.behavior();
    }
}
//# sourceMappingURL=ChainLink.js.map