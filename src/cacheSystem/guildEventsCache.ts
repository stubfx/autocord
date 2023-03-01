export class GuildEventsCache {

    private cacheMap = {}

    addGuildEvent(guildId: string, eventName: string) {
        if (!this.cacheMap[guildId]) {
            // add it
            this.cacheMap[guildId] = []
        }
        this.cacheMap[guildId].push(eventName)
    }

    isEventInCache(guildId: string, eventName: string) {
        let events = this.cacheMap[guildId]
        if (!events) {
            return false
        }
        return !!events.find(el => el === eventName)
    }

    clearGuildCache(guildId: string) {
        delete this.cacheMap[guildId]
    }

}