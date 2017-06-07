"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
exports.chain = curry_1.default(function (f, m) {
    return m.chain(f);
});
