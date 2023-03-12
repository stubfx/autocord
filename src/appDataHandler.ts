import {AppDataModel} from "./schemas/appDataSchema.js";

class AppDataHandlerClazz {
    private interval = null

    private eventCount = 0

    init() {
        if (this.interval) {
            throw new Error('App data handler already initialized.')
        }
        // save data in db every 5 mins.
        this.interval = setInterval(async () => {
            // ASSUME THERE IS ONLY ONE ITEM. UPDATE ONLY THE FIRST ONE.
            await AppDataModel.findOneAndUpdate({}, {
                $inc: {eventCount: this.eventCount}
            }, {upsert: true})
            // reset.
            this.eventCount = 0
        }, 5 * 60 * 1000) // save every 5 mins
    }

    increaseEventCount() {
        this.eventCount++
    }

    async getEventCount() {
        let data = await AppDataModel.findOne();
        return data ? data.eventCount : 0;
    }
}

export const AppDataHandler = new AppDataHandlerClazz()