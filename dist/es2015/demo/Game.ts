import * as util from "../types/utils";
import {IO} from "../types/IO";
export class Game{
    public static of(){
        var obj = new this();

        return obj;
    }

    public run(){

    }

    private getCanvas(){
        return IO.of(()=>{
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            document.body.appendChild(canvas);

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

}
