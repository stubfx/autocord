

export class NetworkAdapter {

    static getServerUrl() {
        // remap only localhost, unfortunately proxy won't work on this machine.
        // and we cannot build on the prod server for wakeup performance reasons
        return window.location.host.includes("localhost") ? 'http://localhost:3000' : ''
    }

    static async _post(route, body) {
            return (await fetch(this.getServerUrl() + route, {
                method: 'POST',
                // credentials are required for the session
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body || {})
            })).json()
    }

    static async getDiscordLoginUrl() {
        return (await this._post('/getDiscordLoginUrl'))['url']
    }

    static async loginCheck() {
        return (await this._post('/logincheck'))['result']
    }

    static async getOwnedGuilds() {
        return await this._post('/auth/ownedGuilds')
    }

    static async isBotInGuild(guildId) {
        return await this._post(`/auth/checkBotInGuild`, {guildId : guildId})
    }

    static async getDiscordBotInviteUrl(guildId) {
        return (await this._post(`/auth/getAddBotToGuildInvite`, {guildId : guildId}))['url']
    }

    static async getGuildJobs(guildId) {
        return (await this._post(`/auth/getGuildJobs`, {guildId : guildId}))['jobs']
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

}