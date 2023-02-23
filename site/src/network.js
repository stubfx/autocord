export class NetworkAdapter {

    static async _get(route) {
        try {
            // return (await fetch('http://localhost:3000' + route)).json()
            return (await fetch(route)).json()
        } catch (e) {
            // window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1078071216226709525&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds'
        }
    }

    static async getOwnedGuilds() {
        return await this._get('/auth/ownedGuilds')
    }
}