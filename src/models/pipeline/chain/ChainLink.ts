import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";
import {AggregatedGuildInterface} from "../../GuildInterface";
import {discordClient} from "../../../discordbot.js";

export abstract class ChainLink<T extends ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event> implements ChainLinkInterface {

    readonly name: T;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    guild: AggregatedGuildInterface

    private store = {}

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<{
        name: string,
        type: ChainLinkTypes.Param,
        options?: Array<{
            name: string,
            value: any
        }> | null
    }> = []
    // used to help the user know which params the link adds to the store
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

    getResolvedParam(paramName: string) {
        return this.resolveStringEmbeds(this.getParam(paramName))
    }

    getParam(paramName: string) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value
    }

    addParam(paramName: string, value: string) {
        return this.store[paramName] = value
    }

    private getStoreValue(paramName: string) {
        return this.store[paramName]
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

    run(guildInterface: AggregatedGuildInterface, store: any): Promise<Boolean> {
        this.guild = guildInterface
        this.store = store || {}
        return this.behavior()
    }

    increaseStorageCounter(paramName: string) {
        return this.store[paramName]++
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
                throw new Error(`Param value be null.`)
            }
            let acceptedParam = this.acceptParams[i]
            if (acceptedParam.name !== paramToCheck.name) {
                throw new Error(`Cannot match param names:  ${paramToCheck.name} with ${acceptedParam.name}`)
            }
            // ok same name
            let type = acceptedParam.type
            switch (type) {
                case ChainLinkTypes.Param.STRING:
                case ChainLinkTypes.Param.CHANNEL_ID:
                case ChainLinkTypes.Param.ROLE_ID:
                case ChainLinkTypes.Param.CHANNEL_TYPE:
                case ChainLinkTypes.Param.CATEGORY_ID:
                    let length = paramToCheck.value.length;
                    if (length > 150) {
                        throw new Error(`Param value cannot be longer than 150 chars. Current ${length}`)
                    }
                    break
                default:
                    throw Error('Excuse me wtf?')
            }
        }
        // congratulations!
    }

    protected async fetchedGuild() {
        return await discordClient.guilds.fetch(this.guild.guildId)
    }

    protected abstract behavior(): Promise<Boolean>

}