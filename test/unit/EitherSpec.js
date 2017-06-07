"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var jsv = require("jsverify");
var Either_1 = require("../../dist/commonjs/types/Either");
var Maybe_1 = require("../../dist/commonjs/types/Maybe");
var property_1 = require("wonder-lodash/property");
var toString_1 = require("wonder-lodash/toString");
var utils_1 = require("./utils");
var flowRight_1 = require("wonder-lodash/flowRight");
var curry_1 = require("wonder-lodash/curry");
describe("Either", function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe("handle error", function () {
        beforeEach(function () {
        });
        it("can show error info", function () {
            var left = Either_1.Left.of("fail");
            var getNum = function (x) {
                if (x < 0) {
                    return left;
                }
                return Either_1.Right.of(x);
            };
            var handleNum = function (x) {
                return x * 2;
            };
            expect(getNum(-1).map(handleNum)).toEqual(left);
            expect(getNum(10).map(handleNum)).toEqual(Either_1.Right.of(10 * 2));
        });
    });
    describe("either", function () {
        var fnNatArb = jsv.fn(jsv.nat);
        var leftArb = function (arb) {
            return arb.smap(function (x) { return Either_1.Left.of(x); }, property_1.default("val"), toString_1.default);
        };
        var rightArb = function (arb) {
            return arb.smap(function (x) { return Either_1.Right.of(x); }, property_1.default("val"), toString_1.default);
        };
        beforeEach(function () {
        });
        it("returns the value of a Left after applying the first function arg", function () {
            jsv.assert(jsv.forall(leftArb(jsv.nat), fnNatArb, fnNatArb, function (e, f, g) {
                return e.either(f, g) === f(e.val);
            }));
        });
        it("returns the value of a Right after applying the second function arg", function () {
            jsv.assert(jsv.forall(rightArb(jsv.nat), fnNatArb, fnNatArb, function (e, f, g) {
                return e.either(f, g) === g(e.val);
            }));
        });
    });
    describe("chain", function () {
        beforeEach(function () {
        });
        it("map and join", function () {
            var left = Either_1.Left.of("invalid num");
            var getNum = function (x) {
                if (x > 0) {
                    return Either_1.Right.of(x);
                }
                return left;
            };
            var handleNum = function (x) {
                return Either_1.Right.of(x * 10);
            };
            var func = flowRight_1.default(utils_1.chain(handleNum), getNum);
            expect(func(2)).toEqual(Either_1.Right.of(2 * 10));
            expect(func(0)).toEqual(left);
        });
    });
    describe("ap", function () {
        var add = curry_1.default(function (x, y) { return x + y; });
        beforeEach(function () {
        });
        it("test with Maybe", function () {
            expect(Either_1.Right.of(add).ap(Maybe_1.Maybe.of(2)).ap(Maybe_1.Maybe.of(3))).toEqual(Maybe_1.Maybe.of(5));
        });
        it("test Right", function () {
            expect(Either_1.Right.of(add).ap(Either_1.Right.of(2)).ap(Either_1.Right.of(3))).toEqual(Either_1.Right.of(5));
        });
        it("test Left", function () {
            expect(Either_1.Right.of(add).ap(Either_1.Left.of(2)).ap(Either_1.Right.of(3))).toEqual(Either_1.Left.of(2));
        });
    });
    describe("toString", function () {
        beforeEach(function () {
        });
        it("show info", function () {
            expect(Either_1.Right.of(1).toString()).toEqual("Right(1)");
            expect(Either_1.Left.of(1).toString()).toEqual("Left(1)");
        });
    });
});
