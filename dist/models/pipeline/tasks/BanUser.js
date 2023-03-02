import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class BanUser extends Task {
    name = ChainLinkTypes.Task.BanUser;
    description = "Ban user by userId.";
    async behavior(...args) {
        console.log('BANNING USER!!!');
        return true;
    }
}
//# sourceMappingURL=BanUser.js.map