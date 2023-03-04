export class NetworkAdapter {

    static getServerUrl() {
        // remap only localhost, unfortunately proxy won't work on this machine.
        // and we cannot build on the prod server for wakeup performance reasons
        return window.location.host.includes("localhost") ? 'http://localhost:3000' : ''
    }

    static async _post(route, body) {
        let response = await fetch(this.getServerUrl() + route, {
            method: 'POST',
            // credentials are required for the session
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body || {})
        });
        if (!response.ok) {
            return false
        }
        return response.json()
    }

    static async getDiscordLoginUrl() {
        return (await this._post('/api/getDiscordLoginPopupUrl'))['url']
    }

    static async loginCheck() {
        return (await this._post('/api/logincheck'))['result']
    }

    static async logout() {
        return (await this._post(`/api/auth/logout`))
    }

    static async getOwnedGuilds() {
        return await this._post('/api/auth/ownedGuilds')
    }

    static async getGuildChannels(guildId) {
        return await this._post('/api/auth/getGuildChannels', {guildId: guildId})
    }

    static async getGuildRoles(guildId) {
        return await this._post('/api/auth/getGuildRoles', {guildId: guildId})
    }

    static async isBotInGuild(guildId) {
        return await this._post(`/api/auth/checkBotInGuild`, {guildId: guildId})
    }

    static async getDiscordBotInviteUrl(guildId) {
        return (await this._post(`/api/auth/getAddBotToGuildPopupInvite`, {guildId: guildId}))['url']
    }

    static async getGuildData(guildId) {
        return await this._post(`/api/auth/getGuildJobs`, {guildId: guildId})
    }

    static async getAvailableJobTasks() {
        return (await this._post(`/api/getAvailableJobTasks`))['links']
    }

    static async getAvailableJobConditions() {
        return (await this._post(`/api/getAvailableJobConditions`))['links']
    }

    static async getAvailableEventNames() {
        return (await this._post(`/api/getAvailableEventNames`))['links']
    }

    static async getBotGuildCount() {
        return (await this._post(`/api/getBotGuildCount`))['guildCount']
    }

    static async saveJob(guildId, job) {
        return (await this._post(`/api/auth/saveJob`, {guildId: guildId, job: job}))
    }

    static async deleteJob(guildId, job) {
        return (await this._post(`/api/auth/deleteJob`, {guildId: guildId, job: job}))
    }

    static async addStorageData(guildId, dataName) {
        return (await this._post(`/api/auth/addStorageData`, {guildId: guildId, dataName: dataName}))
    }

    static async deleteStorageData(guildId, dataName) {
        return (await this._post(`/api/auth/deleteStorageData`, {guildId: guildId, dataName: dataName}))
    }

}