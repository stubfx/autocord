import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class BanUser extends Task {
    name = ChainLinkTypes.Task.BanUser;
    async behavior(...args) {
        console.log('BANNING USER!!!');
        return true;
    }
}
//# sourceMappingURL=BanUser.js.map