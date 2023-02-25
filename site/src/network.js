export class NetworkAdapter {

    static async _get(route) {
        try {
            return (await fetch('http://localhost:3000' + route, {
                // credentials are required for the session
                credentials: 'include'
            })).json()
        } catch (e) {
            window.location.href = '/'
        }
    }

    static async getOwnedGuilds() {
        return await this._get('/auth/ownedGuilds')
    }

    static async openGuild(guildId) {
        if (!await this._get(`/auth/checkBotInGuild?guildId=${guildId}`)) {
            // bot is not in the server prompt the user!
            window.location.href = (await this._get(`/auth/getAddBotToGuildInvite?guildId=${guildId}`))['url']
            return false
        }
        return true
    }

    static async getGuildJobs(guildId) {
        return (await this._get(`/auth/getGuildJobs?guildId=${guildId}`))['jobs']
    }

    static async getAvailableJobTasks() {
        return (await this._get(`/auth/getAvailableJobTasks`))['links']
    }

    static async getAvailableJobConditions() {
        return (await this._get(`/auth/getAvailableJobConditions`))['links']
    }

    static async getAvailableEventNames() {
        return (await this._get(`/auth/getAvailableEventNames`))['links']
    }

}