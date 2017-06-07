import * as sinon from "sinon";
import { IO } from "../../dist/commonjs/types/IO";

describe("IO", () => {
    var sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe("ap", () => {
        beforeEach(() => {
        });

        it("test", () => {
            var outerObj = {
                say: sandbox.stub()
            };


            IO.of(() => {
                return outerObj.say;
            }).ap(IO.of(() => "aaa"))
                .run();

            expect(outerObj.say).toCalledWith("aaa");
        });
    });

    describe("toString", () => {
        beforeEach(() => {
        });

        it("show info", () => {
            expect(IO.of(() => {
                return 1;
            }).toString()).toEqual(`IO(function () {
                return 1;
            })`);
        });
    });
});

