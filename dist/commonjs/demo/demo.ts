import {IO} from "../types/IO";
import {curry, flowRight} from "wonder-lodash";
import {AjaxUtil} from "../types/AjaxUtil";
declare var $:any;
export class demo{

    public static of(){
        var obj = new this();

        return obj;
    }

    public run(){
        var ajax = this.getJson();
        var log = (val)=>{
            console.log(val)
        };

        /**
         * function(url){
         *    return IO.of(()=>{
                return AjaxUtil.ajax({
                   url:url,
                   success:callback,
                   error:()=>{console.log("ajax error");}
                })
         *    })
         *  }
         */
        var logAjax = ajax(log);

        /**
         * function(logAjax,url){
         *    return function(x){
         *       return logAjax(url(x));
         *    }
         * }
         */
        var app = flowRight(logAjax,this.url);

        /**
         * app("11") -->  返回 IO 容器
         * app("11").run() --> 执行 ajax 获取文件
         */

        var showImg = function (img) {
            document.getElementById("ct").appendChild(img);
            return img;
        };
        app("11").map(showImg).run();

    }

    public url(term){
        return './'+term+'.jpg';
    }

    public getJson(){
        /**
         * function(callback){
         *    return function(url){
         *        return IO.of(()=>{
                    return AjaxUtil.ajax({
                        url:url,
                        success:callback,
                        error:()=>{console.log("ajax error");}
                    })
         *        })
         *    }
         * }
         */
        return curry((callback,url)=>{
            return IO.of(() => {
                var img = new Image();
                img.src = url;
                img.onload = callback;

                return img;
            })
        })
    }
}

// demo.of().run();
