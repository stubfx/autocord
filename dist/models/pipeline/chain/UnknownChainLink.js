import { ChainLink } from "./ChainLink.js";
import { ChainLinkTypes } from "./ChainLinkTypes.js";
import { LoggerHelper } from "../../../loggerHelper.js";
export class UnknownChainLink extends ChainLink {
    id = ChainLinkTypes.IDs.UNKNOWN.UNKNOWN;
    name = ChainLinkTypes.IDs.UNKNOWN.UNKNOWN;
    description = "This element is unknown :/";
    type = ChainLinkTypes.LinkType.UNKNOWN;
    async behavior(...args) {
        // do nothing.
        return false;
    }
    validate() {
        LoggerHelper.warn('TRYING TO VALIDATE UNKNOWN CHAINLINK.');
        return false;
    }
}
//# sourceMappingURL=UnknownChainLink.js.map