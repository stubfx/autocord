export class NetworkAdapter {

    static async _get(route) {
        try {
            return (await fetch('http://localhost:3000' + route, {
                credentials: 'include'
            })).json()
            // return (await fetch(route)).json()
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
            return
        }
        // in this case we are safe to go.

    }
}