import { Task } from "../Task.js";
export class BanUser extends Task {
    name = "BanUser";
    async exec(...args) {
        console.log('BANNING USER!!!');
        return { data: undefined, result: true };
    }
}
//# sourceMappingURL=BanUser.js.map