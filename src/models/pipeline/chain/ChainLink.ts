import {ChainLinkTypes} from "./ChainLinkTypes.js";
import {ChainLinkInterface, ChainLinkParam} from "../../ChainLinkInterface";

export abstract class ChainLink<T extends ChainLinkTypes.Task | ChainLinkTypes.Condition | ChainLinkTypes.Event> implements ChainLinkInterface {

    readonly name: T;
    readonly type: ChainLinkTypes.LinkType
    description: string = "Missing description :P"

    guildId : string

    private eventArgs = {}

    // used to help the user know which params the link accepts
    // this won't be saved into the db
    acceptParams: Array<string> = []
    // used to help the user know which params the link adds to the store
    // this won't be saved into the db
    exposesArguments: Array<string> = []
    // this holds the actual param data.
    // this will be saved into the db
    params: Array<ChainLinkParam>

    constructor(params: ChainLinkParam[] = []) {
        this.params = params
    }

    getParam(paramName: string) {
        // let it throw an error on null, if it happens, something has gone wrong.
        return this.params.find(value => value.name === paramName).value
    }

    getEventArg(paramName: string) {
        return this.eventArgs[paramName]
    }

    resolveStringEmbeds(toResolve: string) {
        if (!toResolve || typeof toResolve !== "string") {
            return ""
        }
        const str = toResolve;
        const regex = /\{\{(\w+)}}/g;

        return str.replace(regex, (match, variable) => {
            return this.getEventArg(variable) || match;
        });
    }

    run(guildId : string, eventArgs: any): Promise<Boolean> {
        this.guildId = guildId
        this.eventArgs = eventArgs || {}
        return this.behavior()
    }

    protected abstract behavior() : Promise<Boolean>

}