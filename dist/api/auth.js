import { DiscordApi } from "../discordApi.js";
import * as sessionV from "../sessionVariables.js";
export default function (api, opts, done) {
    api.decorateRequest('userId', '');
    api.addHook('preHandler', async (request, reply) => {
        console.log(JSON.stringify(request.cookies));
        if (!request.session[sessionV.AUTHENTICATED]) {
            reply.code(401);
            return null;
        }
    });
    api.get("/ownedGuilds", async (request) => {
        let userGuilds = await new DiscordApi(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserOwnedGuilds();
        return userGuilds.filter(value => value.owner);
    });
    api.get("/user", async (request) => {
        return await new DiscordApi(request.session[sessionV.AUTHORIZATION_TOKEN]).getUserInfo();
    });
    // only for authenticated users with role.
    // api.register(async (role) => {
    //     role.addHook('preHandler', async (req, res) => {
    //         // check role for all role routes
    //         // if (res.sent) return //stop on error
    //     });
    //     role.get('/my_profile', async () => {
    //         return { hello: 'world' };
    //     });
    // });
    done();
}
//# sourceMappingURL=auth.js.map