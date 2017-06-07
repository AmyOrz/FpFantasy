import {IO} from "../types/IO";
import {curry, flowRight, each} from "wonder-lodash";
import {AjaxUtil} from "../types/AjaxUtil";
import {Maybe} from "../types/Maybe";
import {map, trace, chain, type,props} from "../types/utils";

export class imgLoad{

    public static of(){
        var obj = new this();

        return obj;
    }

    public run(){
        var ajax = this.getJson();

        var showImg = function (url) {
            return IO.of(function () {
                var img = new Image();
                img.onload = function () {
                    document.getElementById("ct").appendChild(img);
                };
                img.src = url;
            })
        };

        var executeIo = (val)=>{
            val.run();
        };

        var getImgUrl = flowRight(executeIo, chain(showImg), props(["media","m"]));

        var eachImgUrl = map(getImgUrl);//array.map()

        var safeResponse = (res)=>{
            //noinspection TypeScriptValidateTypes
            return Maybe.of(res).chain(props("items")).chain(eachImgUrl);
        }

        var response = ajax(safeResponse);

        var app = flowRight(response,this.url);

        app("cars").run();

    }

    public url(term){
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=callback';
    }

    public getJson(){
        return curry((callback,url)=>{
            return IO.of(() => {
                return AjaxUtil.create().ajax({
                    url:url,
                    jsonp:"callback",
                    success:callback,
                    error:()=>{
                        console.log("ajax error")
                    }
                });
            })
        })
    }
}
// imgLoad.of().run();
