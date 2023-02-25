import { Task } from "../Task.js";
import { ChainLinkTypes } from "../chain/ChainLinkTypes.js";
export class BanUser extends Task {
    name = ChainLinkTypes.Task.BanUser;
    async exec(...args) {
        console.log('BANNING USER!!!');
        return { data: undefined, result: true };
    }
}
//# sourceMappingURL=BanUser.js.map