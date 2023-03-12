import {ChainLink} from "./ChainLink.js";
import {ChainLinkTypes} from "./ChainLinkTypes.js";

export class UnknownChainLink extends ChainLink<ChainLinkTypes.IDs.UNKNOWN> {

    id = ChainLinkTypes.IDs.UNKNOWN.UNKNOWN
    name = ChainLinkTypes.IDs.UNKNOWN.UNKNOWN
    readonly type = ChainLinkTypes.LinkType.UNKNOWN

    async behavior(...args) : Promise<Boolean> {
        // do nothing.
        return false
    }

    validate() {
        // this is always valid.
        return true
    }
}