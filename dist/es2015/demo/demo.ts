import {IO} from "../types/IO";
import {flowRight} from "wonder-lodash";
declare var $:any;
export class demo{

    public static of(){
        var obj = new this();

        return obj;
    }

    public run(){
        var showImg = function (img) {
            console.log(img)
            document.getElementById("ct").appendChild(img);
            return img;
        };

        var app = flowRight(this.getJson,this.url);

        /**
         * app("11") -->  返回 IO 容器
         * app("11").run() --> 执行 ajax 获取文件
         */

        app("11").map(showImg).run();

    }

    public url(term){
        return './'+term+'.jpg';
    }

    public getJson(url){
        return IO.of(() => {
            var img = new Image();
            img.src = url;
            return img;
        })
    }
}

// demo.of().run();
