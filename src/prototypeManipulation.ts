export function injectPrototypes() {
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
}