import curry from "wonder-lodash/curry";
import { flowRight } from "wonder-lodash";
import { Maybe } from "./Maybe";
export var chain = curry(function (f, m) {
    return m.chain(f);
});
export var map = curry(function (f, m) {
    return m.map(f);
});
export var either = curry(function (left, right, m) {
    return m.either(left, right);
});
export var trace = curry(function (x, m) {
    console.log(x, " ----> ", m);
    return m;
});
export var objToStr = function (m) {
    return {}.toString.call(m);
};
export var slice = curry(function (start, end, m) {
    return m.slice(start, end);
});
export var lower = function (m) {
    return m.toLowerCase();
};
export var trim = function (m) {
    return m.trim();
};
export var type = flowRight(lower, slice(8, -1), objToStr);
var propRecursion = function () {
};
export var props = curry(function (v, m) {
    if (type(v) == "string") {
        return Maybe.of(m[v]);
    }
    else if (type(v) == "array") {
        v.map(function (val) {
            m = m[val];
        });
        return Maybe.of(m);
    }
});
//# sourceMappingURL=utils.js.map