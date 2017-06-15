import "wonder-frp/dist/commonjs/stream/MapStream";
import * as rx from "rxjs";
export class rxDemo{
    public static of(){
        var obj = new this();

        return obj;
    }

    private _canvas:any = null;
    private _ctx = null;

    run(){
        this._getCanvasCtx();

        //noinspection TypeScriptUnresolvedFunction
        rx.Observable.combineLatest(this._mouseStream(),this._starStream(),this._enemyStream(),(x,y,z)=>{
            return {
                spaceship:x,
                star:y,
                enemy:z
            }
        }).sampleTime(40).subscribe(res=>{
            this._renderScene(res);
        });

    }

    private _renderScene(actor){
        this._drawStars(actor.star);
        this._drawTriangle(actor.spaceship.x, actor.spaceship.y, 20, '#ff0000', 'up')
        actor.enemy.forEach((enemy)=>{
            enemy.y += 5;
            this._drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
        });
    }

    private _enemyStream(){
        //noinspection TypeScriptUnresolvedFunction
        return rx.Observable.interval(1000).scan(arr=>{
            arr.push({
                x: ~~(Math.random() * this._canvas.width),
                y: -30
            })
            return arr;
        },[]);
    }

    private _mouseStream(){
        var y = this._canvas.height - 30;

        //noinspection TypeScriptUnresolvedFunction
        return rx.Observable.fromEvent(this._canvas,"mousemove").map(e=>{
            return {
                x:e.clientX,
                y:y
            }
        }).startWith({
            x:this._canvas.width/2,
            y:y
        })
    }

    private _starStream(){
        var speed = 40,
            number = 250;

        //noinspection TypeScriptUnresolvedFunction
        return rx.Observable.range(1,number).map(res=>{
            return {
                x: ~~(Math.random() * this._canvas.width),
                y: ~~(Math.random() * this._canvas.height),
                size: Math.random() * 3 + 1
            }
        }).toArray().flatMap(arr=>{
            //noinspection TypeScriptUnresolvedFunction
            return rx.Observable.interval(speed).map(()=>{
                arr.forEach(star=>{
                    if(star.y >= this._canvas.height)
                        star.y = 0;
                    else
                        star.y += 3;

                    if(star.x >= this._canvas.width)
                        star.x = 0;
                    else star.x += 3;
                });

                return arr;
            });
        })
    }

    private _drawTriangle(x,y,width,color,direction){
        var ctx = this._ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x - width, y);
        ctx.lineTo(x, direction === 'up' ? y - width : y + width);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x - width,y);
        ctx.fill();
    }

    private _drawStars(stars){
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = '#ffffff';
        stars.forEach((star)=>{
            this._ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }
    private _getCanvasCtx(){
        this._canvas = document.getElementById("webgl");
        this._canvas.width = window.innerWidth-20;
        this._canvas.height = window.innerHeight-20;
        this._ctx = this._canvas.getContext("2d");
    }
}

rxDemo.of().run();
