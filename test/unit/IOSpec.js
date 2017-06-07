"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var IO_1 = require("../../dist/commonjs/types/IO");
describe("IO", function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe("ap", function () {
        beforeEach(function () {
        });
        it("test", function () {
            var outerObj = {
                say: sandbox.stub()
            };
            IO_1.IO.of(function () {
                return outerObj.say;
            }).ap(IO_1.IO.of(function () { return "aaa"; }))
                .run();
            expect(outerObj.say).toCalledWith("aaa");
        });
    });
    describe("toString", function () {
        beforeEach(function () {
        });
        it("show info", function () {
            expect(IO_1.IO.of(function () {
                return 1;
            }).toString()).toEqual("IO(function () {\n                return 1;\n            })");
        });
    });
});
