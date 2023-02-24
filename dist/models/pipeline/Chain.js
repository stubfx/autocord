import * as LoggerHelper from "../../loggerHelper.js";
export class Chain {
    guildId;
    store;
    chainLinks = [];
    async run() {
        for (let chainLink of this.chainLinks) {
            let taskResult;
            console.log(chainLink.type);
            switch (chainLink.type) {
                case "CONDITION":
                    taskResult = await chainLink.exec();
                    break;
                case "TASK":
                    taskResult = await chainLink.exec();
            }
            if (!taskResult.result) {
                LoggerHelper.dev("ENDING CHAIN");
                break;
            }
        }
    }
    addLink(chainLink) {
        this.chainLinks.push(chainLink);
    }
}
//# sourceMappingURL=Chain.js.map