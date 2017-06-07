import { IO } from "../types/IO";
import { curry, flowRight } from "wonder-lodash";
import { AjaxUtil } from "../types/AjaxUtil";
import { Maybe } from "../types/Maybe";
import { map, chain, props } from "../types/utils";
var imgLoad = (function () {
    function imgLoad() {
    }
    imgLoad.of = function () {
        var obj = new this();
        return obj;
    };
    imgLoad.prototype.run = function () {
        var ajax = this.getJson();
        var showImg = function (url) {
            return IO.of(function () {
                var img = new Image();
                img.onload = function () {
                    document.getElementById("ct").appendChild(img);
                };
                img.src = url;
            });
        };
        var executeIo = function (val) {
            val.run();
        };
        var getImgUrl = flowRight(executeIo, chain(showImg), props(["media", "m"]));
        var eachImgUrl = map(getImgUrl);
        var safeResponse = function (res) {
            return Maybe.of(res).chain(props("items")).chain(eachImgUrl);
        };
        var response = ajax(safeResponse);
        var app = flowRight(response, this.url);
        app("cars").run();
    };
    imgLoad.prototype.url = function (term) {
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=callback';
    };
    imgLoad.prototype.getJson = function () {
        return curry(function (callback, url) {
            return IO.of(function () {
                return AjaxUtil.create().ajax({
                    url: url,
                    jsonp: "callback",
                    success: callback,
                    error: function () {
                        console.log("ajax error");
                    }
                });
            });
        });
    };
    return imgLoad;
}());
export { imgLoad };
//# sourceMappingURL=imgLoad.js.map