"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var jsv = require("jsverify");
var Maybe_1 = require("../../dist/commonjs/types/Maybe");
var isEqual_1 = require("wonder-lodash/isEqual");
var curry_1 = require("wonder-lodash/curry");
var flowRight_1 = require("wonder-lodash/flowRight");
var utils_1 = require("./utils");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
describe("Maybe", function () {
    var sandbox;
    beforeEach(function () {
        Collection_1.Collection;
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe("maybe", function () {
        beforeEach(function () {
        });
        it("returns the result of applying the value of a Just to the second argument", function () {
            jsv.assert(jsv.forall(jsv.fn(jsv.nat), jsv.nat, jsv.nat, function (f, n1, n2) {
                return isEqual_1.default(Maybe_1.Maybe.maybe(n2, f, Maybe_1.Maybe.Just(n1)), f(n1));
            }));
        });
        it("returns the first argument for a Nothing", function () {
            jsv.assert(jsv.forall(jsv.fn(jsv.nat), jsv.string, function (f, s) {
                return isEqual_1.default(Maybe_1.Maybe.maybe(s, f, Maybe_1.Maybe.of(null)), s);
            }));
        });
    });
    describe("chain", function () {
        beforeEach(function () {
        });
        it("map and join", function () {
            //  safeProp :: Key -> {Key: a} -> Maybe a
            var safeProp = curry_1.default(function (x, obj) {
                return Maybe_1.Maybe.of(obj[x]);
            });
            //  safeHead :: [a] -> Maybe a
            var safeHead = safeProp(0);
            //  firstAddressStreet :: User -> Maybe (Maybe (Maybe Street) )
            var firstAddressStreet = flowRight_1.default(utils_1.chain(safeProp('street')), utils_1.chain(safeHead), safeProp('addresses'));
            expect(firstAddressStreet({ addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: "WC2N" }] })).toEqual(Maybe_1.Maybe.of({ "name": "Mulburry", "number": 8402 }));
        });
    });
    describe("ap", function () {
        beforeEach(function () {
        });
        it("test", function () {
            var add = curry_1.default(function (x, y) { return x + y; });
            expect(Maybe_1.Maybe.of(add).ap(Maybe_1.Maybe.of(2)).ap(Maybe_1.Maybe.of(3))).toEqual(Maybe_1.Maybe.of(5));
        });
    });
    describe("toString", function () {
        beforeEach(function () {
        });
        it("show info", function () {
            expect(Maybe_1.Maybe.of(1).toString()).toEqual("Maybe.Just(1)");
            expect(Maybe_1.Maybe.of(null).toString()).toEqual("Maybe.Nothing()");
        });
    });
});
