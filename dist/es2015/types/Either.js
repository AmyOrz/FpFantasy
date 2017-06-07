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
var Either = (function () {
    function Either(x) {
        this.val = null;
        this.val = x;
    }
    Either.prototype.either = function (leftFn, rightFn) {
        return null;
    };
    return Either;
}());
export { Either };
var Right = (function (_super) {
    __extends(Right, _super);
    function Right() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Right.of = function (x) {
        var obj = new this(x);
        return obj;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.map = function (f) {
        return Right.of(f(this.val));
    };
    Right.prototype.ap = function (that) {
        return that.map(this.val);
    };
    Right.prototype.chain = function (f) {
        return f(this.val);
    };
    Right.prototype.toString = function () {
        return "Right(" + toString(this.val) + ")";
    };
    return Right;
}(Either));
export { Right };
Right.prototype.either = curry(function either(leftFn, rightFn) {
    return rightFn(this.val);
});
var Left = (function (_super) {
    __extends(Left, _super);
    function Left() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Left.of = function (x) {
        var obj = new this(x);
        return obj;
    };
    Left.prototype.isRight = function () {
        return false;
    };
    Left.prototype.isLeft = function () {
        return true;
    };
    Left.prototype.map = function (f) {
        return this;
    };
    Left.prototype.ap = function (that) {
        return this;
    };
    Left.prototype.chain = function (f) {
        return this;
    };
    Left.prototype.toString = function () {
        return "Left(" + toString(this.val) + ")";
    };
    return Left;
}(Either));
export { Left };
Left.prototype.either = curry(function either(leftFn, rightFn) {
    return leftFn(this.val);
});
//# sourceMappingURL=Either.js.map