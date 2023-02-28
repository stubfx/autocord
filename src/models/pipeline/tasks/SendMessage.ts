import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";
import {discordClient} from "../../../discordbot.js";

export class SendMessage extends Task {
    name = ChainLinkTypes.Task.SendMessage;

    acceptParams = [{
        name: "channelId",
        type: ChainLinkTypes.Param.CHANNEL_ID
    }, {
        name: "message",
        type: ChainLinkTypes.Param.STRING
    }]

    async behavior(...args) : Promise<Boolean> {
        let channelId = this.getParam("channelId");
        let message = this.getParam("message");
        discordClient.channels.fetch(channelId)
            .then(async channel => {
                // @ts-ignore
                await channel.send(this.resolveStringEmbeds(message));
            }).catch(async () => {})
        console.log(this.resolveStringEmbeds(message))
        return true
    }

    // validate() {
    //     // check if channel id is from the same guild.
    //     super.validate()
    // }

}