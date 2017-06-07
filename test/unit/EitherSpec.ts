import * as sinon from "sinon";
import * as jsv from "jsverify";
import { Right, Left } from "../../dist/commonjs/types/Either";
import { Maybe} from "../../dist/commonjs/types/Maybe";
import property from "wonder-lodash/property";
import toString from "wonder-lodash/toString";
import { chain } from "./utils";
import flowRight from "wonder-lodash/flowRight";
import curry from "wonder-lodash/curry";

describe("Either", () => {
    var sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe("handle error", () => {
        beforeEach(() => {
        });

        it("can show error info", () => {
            var left = Left.of("fail");
            var getNum = (x) => {
                if (x < 0) {
                    return left;
                }

                return Right.of(x);
            }
            var handleNum = (x) => {
                return x * 2;
            }

            expect(getNum(-1).map(handleNum)).toEqual(left);
            expect(getNum(10).map(handleNum)).toEqual(Right.of(10 * 2));
        });
    });

    describe("either", () => {
        var fnNatArb = jsv.fn(jsv.nat);
        var leftArb = function (arb) {
            return arb.smap(
                (x) => Left.of(x), property("val"), toString
            );
        };
        var rightArb = function (arb) {
            return arb.smap(
                (x) => Right.of(x), property("val"), toString
            );
        };

        beforeEach(() => {
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

    describe("chain", () => {
        beforeEach(() => {
        });

        it("map and join", () => {
            var left = Left.of("invalid num");
            var getNum = (x) => {
                if (x > 0) {
                    return Right.of(x);
                }

                return left;
            }

            var handleNum = (x) => {
                return Right.of(x * 10);
            }

            var func = flowRight(chain(handleNum), getNum);

            expect(func(2)).toEqual(Right.of(2 * 10));
            expect(func(0)).toEqual(left);
        });
    });

    describe("ap", () => {
        var add = curry((x, y) => x + y);

        beforeEach(() => {
        });

        it("test with Maybe", () => {
            expect(Right.of(add).ap(Maybe.of(2)).ap(Maybe.of(3))).toEqual(Maybe.of(5));
        });
        it("test Right", () => {
            expect(Right.of(add).ap(Right.of(2)).ap(Right.of(3))).toEqual(Right.of(5));
        });
        it("test Left", () => {
            expect(Right.of(add).ap(Left.of(2)).ap(Right.of(3))).toEqual(Left.of(2));
        });
    });

    describe("toString", () => {
        beforeEach(() => {
        });

        it("show info", () => {
            expect(Right.of(1).toString()).toEqual(`Right(1)`);
            expect(Left.of(1).toString()).toEqual(`Left(1)`);
        });
    });
});
