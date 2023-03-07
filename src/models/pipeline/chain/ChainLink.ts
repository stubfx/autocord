import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";
import {AggregatedGuildInterface} from "../../GuildInterface";
import {discordClient} from "../../../discordbot.js";
import {setStorageValue} from "../../../db/storageDBAdapter.js";
import {Guild} from "discord.js";

export abstract class ChainLink<T extends ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event> implements ChainLinkInterface {

    readonly name: T;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    readonly cost : number = 1

    guild: AggregatedGuildInterface

    private storage = {}

    private fetchedGuild : Guild = null

    readonly requiredPermissions: Array<BigInt> = []

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<{
        name: string,
        type: ChainLinkTypes.Param,
        description?: string,
        // value?: any,
        options?: Array<{
            name: string,
            value: any
        }> | null
    }> = []
    // used to help the user know which params the link adds to the storage
    // this won't be saved into the db
    exposesArguments: Array<string> = []
    // this holds the actual param data.
    // this will be saved into the db
    params: Array<ChainLinkParam> = []

    // do not remove params here, is not directly called,
    // but it's used by its children
    constructor(params: ChainLinkParam[] = []) {
        // TODO match params in command (ex we are saving forceString in DB!!! which is fine btw)
        // force string is ok, as the user can see that in the interface, however is not ok that
        // everything coming from the web interface is not validated.
        this.params = params
    }

    getResolvedParam(paramName: string) : string {
        return this.resolveStringEmbeds(this.getParam(paramName))
    }

    getParam(paramName: string): string {
        // let it throw an error on null, if it happens, something has gone wrong.
        let param = this.params.find(value => value.name === paramName).value
        // if it does not exist, check in the storage?
        if (!param) {
            param = this.storage[paramName]
        }
        return param
    }

    setStorageParam(paramName: string, value: string) {
        return this.storage[paramName] = value
    }

    async increaseStorageCounter(paramName: string, amount = 1) {
        // this may be an empty string.
        if (this.storage[paramName] !== undefined) {
            this.storage[paramName] = +this.storage[paramName] + amount
            await this.setSharedStorageValue(paramName, this.storage[paramName])
        }
    }

    async setSharedStorageValue(paramName: string, value) {
        // if (!paramName || !(paramName in this.storage) || !value) {
        // compare with undefined is 16% faster than using "in"
        if (!paramName || this.storage[paramName] === undefined || !value) {
            // make sure stuff exists.
            // save db queries whenever possible
            return
        }
        this.storage[paramName] = `${value}`
        if (this.storage[paramName] < 150) {
            await setStorageValue(this.guild.storage.id, paramName, this.storage[paramName])
        }
        // don't save this in the db for storage reasons.
    }

    private getStoreValue(paramName: string) {
        return this.storage[paramName]
    }

    resolveStringEmbeds(toResolve: string) {
        if (!toResolve || typeof toResolve !== "string") {
            return ""
        }
        const str = toResolve;
        const regex = /\{\{(\w+)}}/g;

        return str.replace(regex, (match, variable) => {
            return this.getStoreValue(variable) || match;
        });
    }

    run(guildInterface: AggregatedGuildInterface, storage: any): Promise<Boolean> {
        this.guild = guildInterface
        this.storage = storage || {}
        return this.behavior()
    }

    validate() {
        // make all the checks here!
        // remember that acceptParams are the actual params accepted by the link
        // but params are actually sent by the users.
        // NO MERCY.
        // check length, they must match
        let paramsLength = this.params ? this.params.length : 0;
        if (this.acceptParams.length !== paramsLength) {
            throw new Error(`Params length doesn't match acceptedParams length for ${this.name}`)
        }
        for (let i = 0; i < this.params.length; i++) {
            // for each param, match the same in the acceptParams
            // however, by design and performance reason, we must match by index
            let paramToCheck = this.params[i]
            if (!paramToCheck) {
                throw new Error(`Param cannot be null.`)
            }
            if (!paramToCheck.name) {
                throw new Error(`Param name be null.`)
            }
            if (!paramToCheck.value) {
                throw new Error(`Param value cannot be null.`)
            }
            let acceptedParam = this.acceptParams[i]
            if (acceptedParam.name !== paramToCheck.name) {
                throw new Error(`Cannot match param names:  ${paramToCheck.name} with ${acceptedParam.name}`)
            }
            // ok same name
            let type = acceptedParam.type
            switch (type) {
                case ChainLinkTypes.Param.REGEX:
                    // this can be really demanding if the regex is long or too complex
                    this.checkParameterRegexLength(paramToCheck);
                    break
                case ChainLinkTypes.Param.LIST:
                    // this.checkParameterRegexLength(paramToCheck);
                    this.checkParameterList(paramToCheck);
                    break
                // case ChainLinkTypes.Param.STRING:
                // case ChainLinkTypes.Param.CHANNEL_ID:
                // case ChainLinkTypes.Param.ROLE_ID:
                // case ChainLinkTypes.Param.CHANNEL_TYPE:
                // case ChainLinkTypes.Param.CATEGORY_ID:
                //     this.checkParameterStringLength(paramToCheck);
                //     break
                default:
                    // LoggerHelper.warn(`Missing validation for ${type}. Using default.`)
                    this.checkParameterStringLength(paramToCheck);
            }
        }
        // congratulations!
    }

    private checkParameterStringLength(paramToCheck: ChainLinkParam) {
        this.checkStringLength(paramToCheck.value);
    }

    private checkStringLength(string: string) {
        if (string.length > 150) {
            throw new Error(`Param value cannot be longer than 150 chars.`)
        }
    }

    protected async getFetchedGuild() {
        if (!this.fetchedGuild) {
            this.fetchedGuild = await discordClient.guilds.fetch(this.guild.guildId)
        }
        return this.fetchedGuild
    }

    protected abstract behavior(): Promise<Boolean>

    private checkParameterRegexLength(paramToCheck: ChainLinkParam) {
        let length = paramToCheck.value.length;
        if (length > 10) {
            throw new Error(`Regex value cannot be longer than 10 chars.`)
        }
    }

    private checkParameterList(paramToCheck: ChainLinkParam) {
        if (!paramToCheck.value || paramToCheck.value.length < 1) {
            throw new Error(`List cannot be empty.`)
        }
        if (paramToCheck.value.length > 20) {
            throw new Error(`List cannot contain more than 20 items.`)
        }
        for (let string of paramToCheck.value) {
            this.checkStringLength(string);
        }
    }
}