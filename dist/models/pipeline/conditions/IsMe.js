import { Condition } from "../Condition.js";
export class IsMe extends Condition {
    name = "IsMe";
    params;
    async exec(...args) {
        let cond = true;
        console.log(`CONDITION ${cond}`);
        return { data: undefined, result: cond };
    }
}
//# sourceMappingURL=IsMe.js.map