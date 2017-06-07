import curry from "wonder-lodash/curry";
export var chain = curry(function (f, m) {
    return m.chain(f);
});
export var map = curry(function (f, m) {
    return m.map(f);
});
export var either = curry(function (left, right, m) {
    return m.either(left, right);
});
//# sourceMappingURL=utils.js.map