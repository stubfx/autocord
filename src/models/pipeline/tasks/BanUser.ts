import {Task} from "../Task.js";
import {ChainLinkTypes} from "../chain/ChainLinkTypes.js";

export class BanUser extends Task {
    name = ChainLinkTypes.Task.BanUser;

    async behavior(...args): Promise<Boolean> {
        console.log('BANNING USER!!!')
        return true
    }

    // toJson(): any {
    //
    // }

}