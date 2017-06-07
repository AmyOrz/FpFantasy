import flowRight from "wonder-lodash/flowRight";
import toString from "wonder-lodash/toString";
var IO = (function () {
    function IO(func) {
        this.func = null;
        this.func = func;
    }
    IO.of = function (func) {
        var obj = new this(func);
        return obj;
    };
    IO.prototype.chain = function (f) {
        var io = this;
        return IO.of(function () {
            var next = f(io.func.apply(io, arguments));
            return next.func.apply(next, arguments);
        });
    };
    IO.prototype.map = function (f) {
        return IO.of(flowRight(f, this.func));
    };
    ;
    IO.prototype.ap = function (thatIO) {
        return this.chain(function (f) {
            return thatIO.map(f);
        });
    };
    ;
    IO.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.func.apply(this, arguments);
    };
    ;
    IO.prototype.toString = function () {
        return "IO(" + toString(this.func) + ")";
    };
    return IO;
}());
export { IO };
//# sourceMappingURL=IO.js.map