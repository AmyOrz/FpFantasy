import curry from "wonder-lodash/curry";

export var chain = curry((f, m) => {
    return m.chain(f);
});

export var map = curry((f,m) =>{
    return m.map(f)
})

export var either = curry(function (left,right,m) {
    return m.either(left,right);
});
