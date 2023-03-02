import { discordClient } from "../../../discordbot.js";
export class ChainLink {
    name;
    type;
    description = "Missing description :P";
    guild;
    store = {};
    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams = [];
    // used to help the user know which params the link adds to the store
    // this won't be saved into the db
    exposesArguments = [];
    // this holds the actual param data.
    // this will be saved into the db
    params;
    constructor(params = []) {
        // TODO match params in command (ex we are saving forceString in DB!!! which is fine btw)
        // force string is ok, as the user can see that in the interface, however is not ok that
        // everything coming from the web interface is not validated.
        // if (validate) {
        //     this.validate()
        // }
        this.params = params;
    }
    getResolvedParam(paramName) {
        return this.resolveStringEmbeds(this.getParam(paramName));
    }
    getParam(paramName) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value;
    }
    addParam(paramName, value) {
        return this.store[paramName] = value;
    }
    getStoreValue(paramName) {
        return this.store[paramName];
    }
    resolveStringEmbeds(toResolve) {
        if (!toResolve || typeof toResolve !== "string") {
            return "";
        }
        const str = toResolve;
        const regex = /\{\{(\w+)}}/g;
        return str.replace(regex, (match, variable) => {
            return this.getStoreValue(variable) || match;
        });
    }
    run(guildInterface, store) {
        this.guild = guildInterface;
        this.store = store || {};
        return this.behavior();
    }
    increaseStorageCounter(paramName) {
        return this.store[paramName]++;
    }
    validate() {
        throw new Error(`Validation for ${this.name} not implemented`);
    }
    async fetchedGuild() {
        return await discordClient.guilds.fetch(this.guild.guildId);
    }
}
//# sourceMappingURL=ChainLink.js.map