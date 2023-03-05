import * as EventHandler from "../EventHandler.js";
import {ChainLinkTypes} from "../../models/pipeline/chain/ChainLinkTypes.js";
import {LoggerHelper} from "../../loggerHelper.js";

export class ClockEmitter {

    constructor() {
        this.startHourlyEmitter()
    }

    private startHourlyEmitter() {
        setInterval(() => {
            this.emit()
        }, 60 * 60 * 1000)
    }

    private async emit() {
        try {
            await EventHandler.runEventForAllGuilds(ChainLinkTypes.Event.EveryHour, {})
        } catch (e) {
            LoggerHelper.error(e)
        }
    }
}