import * as EventHandler from "../EventHandler.js";
import {ChainLinkTypes} from "../../models/pipeline/chain/ChainLinkTypes.js";
import {LoggerHelper} from "../../loggerHelper.js";
import localDB from "../../db/local/localDB.js";

export class ClockEmitter {

    constructor() {
        this.startHourlyEmitter()
    }

    private startHourlyEmitter() {
        setInterval(() => {
            // do not await here.
            this.emitHourly().then(() => {/*do nothing*/})
            this.emitDaily().then(() => {/*do nothing*/})
            this.emitRandomly().then(() => {/*do nothing*/})
        }, 2000)
    }

    private async emitHourly() {
        const currentDate = new Date()
        const cachedDate = new Date(localDB.data.clock.everyHour)
        let hourDiff = (currentDate.getTime() - cachedDate.getTime()) / (1000 * 60 * 60);
        if (hourDiff >= 1) {
            localDB.data.clock.everyHour = new Date()
            await localDB.write()
            try {
                await EventHandler.runEventForAllGuilds(ChainLinkTypes.Event.EveryHour, {})
            } catch (e) {
                LoggerHelper.error(e)
            }
        }
    }

    private async emitDaily() {
        const currentDate = new Date()
        const cachedDate = new Date(localDB.data.clock.everyHour)
        let dayDiff = (currentDate.getTime() - cachedDate.getTime()) / (1000 * 60 * 60 * 24);
        if (dayDiff >= 1) {
            localDB.data.clock.everyDay = new Date()
            await localDB.write()
            try {
                await EventHandler.runEventForAllGuilds(ChainLinkTypes.Event.Randomly, {})
            } catch (e) {
                LoggerHelper.error(e)
            }
        }
    }

    private async emitRandomly() {
        // less than 5% every 2 secs.
        if (Math.random() < 0.01) {
            try {
                await EventHandler.runEventForAllGuilds(ChainLinkTypes.Event.Randomly, {})
            } catch (e) {
                LoggerHelper.error(e)
            }
        }
    }
}