export class NetworkAdapter {

    static async _post(route, body) {
        try {
            return (await fetch('http://localhost:3000' + route, {
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

    static async getOwnedGuilds() {
        return await this._post('/auth/ownedGuilds')
    }

    static async openGuild(guildId) {
        if (!await this._post(`/auth/checkBotInGuild`, {guildId : guildId})) {
            // bot is not in the server prompt the user!
            window.location.href = (await this._post(`/auth/getAddBotToGuildInvite`, {guildId : guildId}))['url']
            return false
        }
        return true
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

}