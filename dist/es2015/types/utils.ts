import curry from "wonder-lodash/curry";
import {flowRight} from "wonder-lodash";
import {Maybe} from "./Maybe";

export var chain = curry((f, m) => {
    return m.chain(f);
});

export var map = curry((f,m) =>{
    return m.map(f)
})

export var either = curry(function (left,right,m) {
    return m.either(left,right);
});

export var trace = curry(function (x,m) {
    console.log(x," ----> ",m);
    return m;
});

export var objToStr = (m)=>{
    return {}.toString.call(m);
}

export var slice = curry((start,end,m)=>{
    return m.slice(start,end);
});

export var lower = (m)=>{
    return m.toLowerCase();
}

export var trim = (m)=>{
    return m.trim();
}

export var type = flowRight(lower,slice(8,-1),objToStr);

var propRecursion = ()=>{

}

export var props = curry((v,m)=>{
    if(type(v) == "string") {

        return Maybe.of(m[v]);

    }else if(type(v) == "array"){

        v.map((val)=>{

            m = m[val];

        });

        return Maybe.of(m)
    }
});
