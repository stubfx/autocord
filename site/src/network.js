export class NetworkAdapter {

    static async _get(route) {
        try {
            return (await fetch('http://localhost:3000' + route, {
                credentials: 'include'
            })).json()
            // return (await fetch(route)).json()
        } catch (e) {
            // window.location.href = '/'
        }
    }

    static async getOwnedGuilds() {
        return await this._get('/auth/ownedGuilds')
    }
}