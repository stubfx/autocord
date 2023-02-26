import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
import { discordClient } from "../../../discordbot.js";
export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;
    acceptParams = ["channelId", "message"];
    async behavior(...args) {
        let channelId = this.getParam("channelId");
        let message = this.getParam("message");
        discordClient.channels.fetch(channelId)
            .then(async (channel) => {
            // @ts-ignore
            await channel.send(this.resolveStringEmbeds(message));
        }).catch(async (reason) => { });
        console.log(this.resolveStringEmbeds(message));
        return true;
    }
}
//# sourceMappingURL=SendMessage.js.map