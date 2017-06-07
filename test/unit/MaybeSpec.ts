import * as sinon from "sinon";
import * as jsv from "jsverify";
import { Maybe } from "../../dist/commonjs/types/Maybe";
import isEqual from "wonder-lodash/isEqual";
import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import { chain } from "./utils";
// import { Collection } from "wonder-commonlib/dist/commonjs/Collection";

describe("Maybe", () => {
    var sandbox;

    beforeEach(() => {
        // Collection
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe("maybe", () => {
        beforeEach(() => {
        });

        it("returns the result of applying the value of a Just to the second argument", () => {
            jsv.assert(jsv.forall(jsv.fn(jsv.nat), jsv.nat, jsv.nat, function (f, n1, n2) {
                return isEqual(Maybe.maybe(n2, f, Maybe.Just(n1)), f(n1));
            }));
        });
        it("returns the first argument for a Nothing", () => {
            jsv.assert(
                jsv.forall(jsv.fn(jsv.nat), jsv.string, (f, s) => {
                    return isEqual(Maybe.maybe(s, f, Maybe.of(null)), s);
                })
            );
        });
    });

    describe("chain", () => {
        beforeEach(() => {

        });

        it("map and join", () => {
            //  safeProp :: Key -> {Key: a} -> Maybe a
            var safeProp = curry(function (x, obj) {
                return Maybe.of(obj[x]);
            });

            //  safeHead :: [a] -> Maybe a
            var safeHead = safeProp(0);

            //  firstAddressStreet :: User -> Maybe (Maybe (Maybe Street) )
            var firstAddressStreet = flowRight(
                chain(safeProp('street')), chain(safeHead), safeProp('addresses')
            );

            expect(firstAddressStreet(
                { addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: "WC2N" }] }
            )).toEqual(Maybe.of({"name": "Mulburry", "number": 8402}));
        });
    });

    describe("ap", () => {
        beforeEach(() => {

        });

        it("test", () => {
            var add = curry((x, y) => x + y);

            expect(Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3))).toEqual(Maybe.of(5));
        });
    });

    describe("toString", () => {
        beforeEach(() => {
        });

        it("show info", () => {
            expect(Maybe.of(1).toString()).toEqual(`Maybe.Just(1)`);
            expect(Maybe.of(null).toString()).toEqual(`Maybe.Nothing()`);
        });
    });
});

