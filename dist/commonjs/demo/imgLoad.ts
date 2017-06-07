import {IO} from "../types/IO";
import {curry, flowRight, chain} from "wonder-lodash";
import {AjaxUtil} from "../types/AjaxUtil";
import {Maybe} from "../types/Maybe";
declare var $:any;
export class imgLoad{

    public static of(){
        var obj = new this();

        return obj;
    }

    public run(){
        var ajax = this.getJson();

        var props = curry((v,m)=>{
            return Maybe.of(m[v])
        });

        var logAjax = ajax(props("items"));

        var app = flowRight(logAjax,this.url);

        var showImg = function (img) {
            console.log(img)
        };
        app("cars").map(showImg).run();

    }

    public url(term){
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
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

imgLoad.of().run();
