var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import curry from "wonder-lodash/curry";
import toString from "wonder-lodash/toString";
var _nothing = null;
var Maybe = (function () {
    function Maybe() {
        this.val = null;
    }
    Maybe.of = function (x) {
        return x == null ? _nothing : Maybe.Just(x);
    };
    Maybe.maybe = function (x, f, m) {
    };
    Maybe.Just = function (x) {
        return new Just(x);
    };
    Maybe.Nothing = function () {
        return _nothing;
    };
    Maybe.isJust = function (x) {
        return x.isJust();
    };
    Maybe.isNothing = function (x) {
        return x.isNothing();
    };
    Maybe.prototype.toString = function () {
        return "Maybe.Just(" + toString(this.val) + ")";
    };
    Maybe.prototype.isNothing = function () {
        return false;
    };
    Maybe.prototype.isJust = function () {
        return false;
    };
    return Maybe;
}());
export { Maybe };
Maybe.maybe = curry(function (x, f, m) {
    return m.isNothing() ? x : f(m.val);
});
var Just = (function (_super) {
    __extends(Just, _super);
    function Just(x) {
        var _this = _super.call(this) || this;
        _this.val = x;
        return _this;
    }
    Just.prototype.isJust = function () {
        return true;
    };
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.map = function (f) {
        return new Just(f(this.val));
    };
    Just.prototype.chain = function (f) {
        return f(this.val);
    };
    Just.prototype.ap = function (m) {
        return m.map(this.val);
    };
    ;
    Just.prototype.getOrElse = function () {
        return this.val;
    };
    Just.prototype.toString = function () {
        return "Maybe.Just(" + toString(this.val) + ")";
    };
    return Just;
}(Maybe));
export { Just };
var Nothing = (function (_super) {
    __extends(Nothing, _super);
    function Nothing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nothing.prototype.isJust = function () {
        return false;
    };
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.map = function (f) {
        return this;
    };
    Nothing.prototype.chain = function (f) {
        return this;
    };
    Nothing.prototype.ap = function (m) {
        return this;
    };
    ;
    Nothing.prototype.getOrElse = function (value) {
        return value;
    };
    Nothing.prototype.toString = function () {
        return "Maybe.Nothing()";
    };
    return Nothing;
}(Maybe));
export { Nothing };
_nothing = new Nothing();
//# sourceMappingURL=Maybe.js.map