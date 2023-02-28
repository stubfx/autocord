import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";
import {AggregatedGuildInterface} from "../../GuildInterface";

export abstract class ChainLink<T extends ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event> implements ChainLinkInterface {

    readonly name: T;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    guild : AggregatedGuildInterface

    private store = {}

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<string> = []
    // used to help the user know which params the link adds to the store
    // this won't be saved into the db
    exposesArguments: Array<string> = []
    // this holds the actual param data.
    // this will be saved into the db
    params: Array<ChainLinkParam>

    constructor(params: ChainLinkParam[] = [], validate = false) {
        this.params = params
        if (validate) {
            this.validate()
        }
    }

    getParam(paramName: string) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value
    }

    getStoreValue(paramName: string) {
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

    protected abstract behavior() : Promise<Boolean>

}