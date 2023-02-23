import {DiscordApi} from "../discordApi.js";

export default function (api, opts, done) {
    api.decorateRequest('userId', '')
    api.addHook('preHandler', async (request, reply) => {
        // verify token first.
        try {
            await request.jwtVerify()
            const auth = request.headers.authorization;
            const token = auth.split(' ')[1]
            let userId = api.jwt.decode(token)["userId"];
            request.userId = userId
            console.log(`${userId} is accessing ${request.url}`)
        } catch (e) {
            console.error(e)
        }
    })

    api.get("/ownedGuilds", async (request) => {
        let userGuilds = await new DiscordApi(request.userId).getUserOwnedGuilds();
        return userGuilds.filter(value => value.owner);
    });

    api.get("/user", async (request) => {
        return await new DiscordApi(request.userId).getUserInfo();
    })

    // only for authenticated users with role.
    api.register(async role => {
        role.addHook('preHandler', async (req, res) => {
            // check role for all role routes
            // if (res.sent) return //stop on error
        })

        role.get('/my_profile', async () => {
            return {hello: 'world'}
        })

    })

    done()
}