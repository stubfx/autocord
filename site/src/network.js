

export class NetworkAdapter {

    static getServerUrl() {
        // remap only localhost, unfortunately proxy won't work on this machine.
        // and we cannot build on the prod server for wakeup performance reasons
        return window.location.host.includes("localhost") ? 'http://localhost:3000' : ''
    }

    static async _post(route, body) {
        try {
            return (await fetch(this.getServerUrl() + route, {
                method: 'POST',
                // credentials are required for the session
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body || {})
            })).json()
        } catch (e) {
            window.location.href = '/'
        }
    }

    static async getDiscordLoginUrl() {
        return (await this._post('/getDiscordLoginUrl'))['url']
    }

    static async loginCheck() {
        return (await this._post('/logincheck'))['result']
    }

    static async logout() {
        return (await this._post(`/auth/logout`))
    }

    static async getOwnedGuilds() {
        return await this._post('/auth/ownedGuilds')
    }

    static async getGuildChannels(guildId) {
        return await this._post('/auth/getGuildChannels', {guildId : guildId})
    }

    static async getGuildRoles(guildId) {
        return await this._post('/auth/getGuildRoles', {guildId : guildId})
    }

    static async isBotInGuild(guildId) {
        return await this._post(`/auth/checkBotInGuild`, {guildId : guildId})
    }

    static async getDiscordBotInviteUrl(guildId) {
        return (await this._post(`/auth/getAddBotToGuildInvite`, {guildId : guildId}))['url']
    }

    static async getGuildData(guildId) {
        return await this._post(`/auth/getGuildJobs`, {guildId : guildId})
    }

    static async getAvailableJobTasks() {
        return (await this._post(`/auth/getAvailableJobTasks`))['links']
    }

    static async getAvailableJobConditions() {
        return (await this._post(`/auth/getAvailableJobConditions`))['links']
    }

    static async getAvailableEventNames() {
        return (await this._post(`/auth/getAvailableEventNames`))['links']
    }

    static async saveJob(guildId, job) {
        return (await this._post(`/auth/saveJob`, {guildId : guildId, job: job}))
    }

    static async deleteJob(guildId, job) {
        return (await this._post(`/auth/deleteJob`, {guildId : guildId, job: job}))
    }

    static async addStorageData(guildId, dataName) {
        return (await this._post(`/auth/addStorageData`, {guildId : guildId, dataName: dataName}))
    }

    static async deleteStorageData(guildId, dataName) {
        return (await this._post(`/auth/deleteStorageData`, {guildId : guildId, dataName: dataName}))
    }

}