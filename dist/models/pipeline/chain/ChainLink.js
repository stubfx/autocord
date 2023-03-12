import { ChainLinkTypes } from "./ChainLinkTypes.js";
import { discordClient } from "../../../discordbot.js";
import { setStorageValue } from "../../../db/storageDBAdapter.js";
import { LoggerHelper } from "../../../loggerHelper.js";
export class ChainLink {
    name;
    /**
     * can be Event Task, Condition or SuperTask
     */
    type;
    description = "Missing description :P";
    cost = 1;
    guild;
    storage = {};
    vault = {};
    fetchedGuild = null;
    requiredPermissions = [];
    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams = [];
    // used to help the user know which params the link adds to the storage
    // this won't be saved into the db
    exposesArguments = [];
    // this holds the actual param data.
    // this will be saved into the db
    params = [];
    // do not remove params here, is not directly called,
    // but it's used by its children
    constructor(params = []) {
        // TODO match params in command (ex we are saving forceString in DB!!! which is fine btw)
        // force string is ok, as the user can see that in the interface, however is not ok that
        // everything coming from the web interface is not validated.
        this.params = params;
    }
    getResolvedParam(paramName) {
        return this.resolveStringEmbeds(this.getParam(paramName));
    }
    getParam(paramName) {
        // let it throw an error on null, if it happens, something has gone wrong.
        let param = this.params.find(value => value.name === paramName).value;
        // if it does not exist, check in the storage?
        if (!param) {
            param = this.storage[paramName];
        }
        return param;
    }
    setStorageParam(paramName, value) {
        return this.storage[paramName] = value;
    }
    async increaseStorageCounter(paramName, amount = 1) {
        // this may be an empty string.
        if (this.storage[paramName] !== undefined) {
            this.storage[paramName].value = +this.storage[paramName].value + amount;
            await this.setSharedStorageValue(paramName, this.storage[paramName].value);
        }
    }
    async setSharedStorageValue(paramName, value) {
        // if (!paramName || !(paramName in this.storage) || !value) {
        // compare with undefined is 16% faster than using "in"
        if (!paramName || this.storage[paramName] === undefined || !value) {
            // make sure stuff exists.
            // save db queries whenever possible
            return;
        }
        this.storage[paramName].value = `${value}`;
        if (this.storage[paramName].value < 150) {
            await setStorageValue(this.guild.storage.id, paramName, this.storage[paramName].value);
        }
    }
    getStoreValue(paramName) {
        return this.storage[paramName];
    }
    resolveStringEmbeds(toResolve) {
        if (!toResolve || typeof toResolve !== "string") {
            return "";
        }
        const str = toResolve;
        const regex = /\{\{(\w+)}}/g;
        return str.replace(regex, (match, variable) => {
            let value = this.getStoreValue(variable);
            if (typeof value !== "undefined") {
                return value.value;
            }
            return match;
        });
    }
    run(guildInterface, storage, vault) {
        this.guild = guildInterface;
        this.storage = storage || {};
        this.vault = vault || {};
        return this.behavior();
    }
    validate() {
        // make all the checks here!
        // remember that acceptParams are the actual params accepted by the link
        // but params are actually sent by the users.
        // NO MERCY.
        // check length, they must match
        let paramsLength = this.params ? this.params.length : 0;
        if (this.acceptParams.length !== paramsLength) {
            //throw new Error(`Params length doesn't match acceptedParams length for ${this.name}`)
            LoggerHelper.warn("throw new Error(`Params length doesn't match acceptedParams length for ${this.name}`)");
            return false;
        }
        for (let i = 0; i < this.params.length; i++) {
            // for each param, match the same in the acceptParams
            // however, by design and performance reason, we must match by index
            let paramToCheck = this.params[i];
            if (!paramToCheck) {
                //throw new Error(`Param cannot be null.`)
                LoggerHelper.warn("throw new Error(`Param cannot be null.`)");
                return false;
            }
            if (!paramToCheck.name) {
                //throw new Error(`Param name cannot be null.`)
                LoggerHelper.warn("throw new Error(`Param name cannot be null.`)");
                return false;
            }
            if (paramToCheck.value === null || paramToCheck.value === undefined) {
                //throw new Error(`Param value cannot be null.`)
                LoggerHelper.warn("throw new Error(`Param value cannot be null.`)");
                return false;
            }
            let acceptedParam = this.acceptParams[i];
            if (acceptedParam.name !== paramToCheck.name) {
                //throw new Error(`Cannot match param names:  ${paramToCheck.name} with ${acceptedParam.name}`)
                LoggerHelper.warn("throw new Error(`Cannot match param names:  ${paramToCheck.name} with ${acceptedParam.name}`)");
                return false;
            }
            // ok same name
            let type = acceptedParam.type;
            switch (type) {
                case ChainLinkTypes.Param.REGEX:
                    // this can be really demanding if the regex is long or too complex
                    if (this.checkParameterRegexLength(paramToCheck)) {
                        return false;
                    }
                    break;
                case ChainLinkTypes.Param.LIST:
                    // this.checkParameterRegexLength(paramToCheck);
                    if (this.checkParameterList(paramToCheck)) {
                        return false;
                    }
                    break;
                // case ChainLinkTypes.Param.STRING:
                // case ChainLinkTypes.Param.CHANNEL_ID:
                // case ChainLinkTypes.Param.ROLE_ID:
                // case ChainLinkTypes.Param.CHANNEL_TYPE:
                // case ChainLinkTypes.Param.CATEGORY_ID:
                //     this.checkParameterStringLength(paramToCheck);
                //     break
                default:
                    // LoggerHelper.warn(`Missing validation for ${type}. Using default.`)
                    if (!this.checkParameterStringLength(paramToCheck)) {
                        return false;
                    }
            }
        }
        // congratulations!
        return true;
    }
    checkParameterStringLength(paramToCheck) {
        return this.checkStringLength(paramToCheck.value);
    }
    checkStringLength(string) {
        return string.length <= 150;
    }
    async getFetchedGuild() {
        if (!this.fetchedGuild) {
            this.fetchedGuild = await discordClient.guilds.fetch(this.guild.guildId);
        }
        return this.fetchedGuild;
    }
    checkParameterRegexLength(paramToCheck) {
        return paramToCheck.value.length <= 10;
    }
    checkParameterList(paramToCheck) {
        if (!paramToCheck.value || paramToCheck.value.length < 1) {
            // throw new Error(`List cannot be empty.`)
            LoggerHelper.warn("throw new Error(`List cannot be empty.`)");
            return false;
        }
        if (paramToCheck.value.length > 20) {
            // throw new Error(`List cannot contain more than 20 items.`)
            LoggerHelper.warn("throw new Error(`List cannot contain more than 20 items.`)");
            return false;
        }
        for (let string of paramToCheck.value) {
            if (!this.checkStringLength(string)) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=ChainLink.js.map