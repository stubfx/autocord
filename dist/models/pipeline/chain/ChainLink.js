export class ChainLink {
    name;
    type;
    description = "Missing description :P";
    guildId;
    eventArgs = {};
    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams = [];
    // used to help the user know which params the link adds to the store
    // this won't be saved into the db
    exposesArguments = [];
    // this holds the actual param data.
    // this will be saved into the db
    params;
    constructor(params = [], validate = false) {
        this.params = params;
        if (validate) {
            this.validate();
        }
    }
    getParam(paramName) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value;
    }
    getEventArg(paramName) {
        return this.eventArgs[paramName];
    }
    resolveStringEmbeds(toResolve) {
        if (!toResolve || typeof toResolve !== "string") {
            return "";
        }
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
    validate() {
        throw new Error(`Validation for ${this.name} not implemented`);
    }
}
//# sourceMappingURL=ChainLink.js.map