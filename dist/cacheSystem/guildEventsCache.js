export class GuildEventsCache {
    cacheMap = {};
    addGuildEvent(guildId, eventName) {
        if (!this.cacheMap[guildId]) {
            // add it
            this.cacheMap[guildId] = [];
        }
        this.cacheMap[guildId].push(eventName);
    }
    isEventInCache(guildId, eventName) {
        let events = this.cacheMap[guildId];
        if (!events) {
            return false;
        }
        return !!events.find(el => el === eventName);
    }
    clearGuildCache(guildId) {
        delete this.cacheMap[guildId];
    }
}
//# sourceMappingURL=guildEventsCache.js.map