/**
 * Certain operations cannot be executed too frequently
 * As an example the channel.setName can be called only twice every 10 mins, otherwise the operation will remain pending.
 * In this case, we can save the event in the cache, in this way the likelihood of having a pending event in the code is really
 * unlikely (after a restart for example)
 */
import {LoggerHelper} from "../loggerHelper.js";

const timeLimitInMinutes = 10

export enum OperationName {
    DISCORD_CHANNEL_SETNAME
}

export class OperationsCacheClass {

    private readonly data = {}

    /**
     *
     * @param datasetId could be the guildId for example.
     * @param operationName id of the operation in the cache
     * @param callBack called if the operation has not been limited
     */
    async runIfNotLimited(datasetId: string, operationName: OperationName, callBack: () => Promise<void>) {
        let dataset = this.data[datasetId];
        if (!dataset) {
            // safe to use.
            this.setNewOperationExecution(datasetId, operationName)
            await callBack()
            return
        }
        if (!dataset[operationName]) {
            // safe to use.
            this.setNewOperationExecution(datasetId, operationName)
            await callBack()
            return
        }
        // in this case, check if is expired
        if (this.isOperationSafeToRun(dataset[operationName])) {
            // safe to use.
            this.setNewOperationExecution(datasetId, operationName)
            await callBack()
            return
        }
        // nope.
        LoggerHelper.consoleError(`[OperationsCache] Not running ${OperationName.DISCORD_CHANNEL_SETNAME}`)
    }

    isOperationSafeToRun(operation): boolean {
        const currentDate = new Date()
        const cachedDate = new Date(operation.date)
        return (currentDate.getTime() - cachedDate.getTime()) > (1000 * 60 * timeLimitInMinutes);
    }

    setNewOperationExecution(datasetId: string, operationName: OperationName) {
        if (!this.data[datasetId]) {
            this.data[datasetId] = {}
        }
        this.data[datasetId][operationName] = {
            date : new Date()
            // limit?
        }
    }


}

export const OperationsCache = new OperationsCacheClass()