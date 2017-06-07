import { IO } from "../types/IO";
import { flowRight } from "wonder-lodash";
var demo = (function () {
    function demo() {
    }
    demo.of = function () {
        var obj = new this();
        return obj;
    };
    demo.prototype.run = function () {
        var showImg = function (img) {
            console.log(img);
            document.getElementById("ct").appendChild(img);
            return img;
        };
        var app = flowRight(this.getJson, this.url);
        app("11").map(showImg).run();
    };
    demo.prototype.url = function (term) {
        return './' + term + '.jpg';
    };
    demo.prototype.getJson = function (url) {
        return IO.of(function () {
            var img = new Image();
            img.src = url;
            return img;
        });
    };
    return demo;
}());
export { demo };
//# sourceMappingURL=demo.js.map