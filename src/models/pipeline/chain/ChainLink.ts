import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";
import {AggregatedGuildInterface} from "../../GuildInterface";
import {discordClient} from "../../../discordbot.js";

export abstract class ChainLink<T extends ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event> implements ChainLinkInterface {

    readonly name: T;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    guild : AggregatedGuildInterface

    private store = {}

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<{
        name: string,
        type: ChainLinkTypes.Param,
        options?: Array<{
            name: string,
            value: any
        }> | null}> = []
    // used to help the user know which params the link adds to the store
    // this won't be saved into the db
    exposesArguments: Array<string> = []
    // this holds the actual param data.
    // this will be saved into the db
    params: Array<ChainLinkParam>

    constructor(params: ChainLinkParam[] = []) {
        // TODO match params in command (ex we are saving forceString in DB!!! which is fine btw)
        // force string is ok, as the user can see that in the interface, however is not ok that
        // everything coming from the web interface is not validated.
        // if (validate) {
        //     this.validate()
        // }
        this.params = params
    }

    getResolvedParam(paramName: string) {
        return this.resolveStringEmbeds(this.getParam(paramName))
    }

    getParam(paramName: string) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value
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
        throw new Error(`Validation for ${this.name} not implemented`)
    }

    protected async fetchedGuild() {
        return await discordClient.guilds.fetch(this.guild.guildId)
    }

    protected abstract behavior() : Promise<Boolean>

}