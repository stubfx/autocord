import {EventLink} from "../../EventLink.js";
import {ChainLinkTypes} from "../../chain/ChainLinkTypes.js";

export class SlashCommand extends EventLink {
    id = ChainLinkTypes.IDs.Event.COMMAND;
    name = "Slash command";
    description = "Fired when a new channel gets created"

    acceptParams = [{
        name: 'commandName',
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args): Promise<Boolean> {
        //should run only if command name matches ours.
        return this.getResolvedParam('commandName') === this.vault["commandName"]
    }

}