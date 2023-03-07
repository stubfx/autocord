export function injectPrototypes() {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
//# sourceMappingURL=prototypeManipulation.js.map