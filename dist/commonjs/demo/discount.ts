import {Maybe} from "../types/Maybe";
import {Left, Right, Either} from "../types/Either";
import * as w from 'wonder-lodash';
export class discount{
    run(){
        var taxPrice = w.curry(function (tax,price) {
            if(!w.isNumber(price)){
                return Left.of("you input price is error");
            } else {
                return Right.of(price + (tax * price))
            }
        });

        var discount = w.curry(function (dis,price) {
           if(!w.isNumber(price))return Left.of("you input price is error");

            if(price<10)return Left.of("you input price is lt 10");

            return Right.of(price - (price * dis));
        });

        var addTenTax = taxPrice(0.1);
        var discount25 = discount(0.25);
        var either = w.curry(function (left,right,m) {
            return m.either(left,right);
        });
        var safeProp = w.curry((v,o)=>{
            return Maybe.of(o[v]);
        });
        var getPrice = safeProp("price");


        const displayTotal = (total) => { console.log('总价为: ' + total) };

        const logError = (error) => { console.log('错误: ' + error); };

        //eitherLogOrShow :: either a -> b
        const eitherLogOrShow = either(logError, displayTotal);

        const showTotalPrice = (item) => eitherLogOrShow(getPrice(item).chain(addTenTax).chain(discount25));

        let tShirt = { name: 't-shirt', price: 11 };
        let pant = { name: 't-shirt', price: '10 美元' }; // 错误
        let chips = { name: 't-shirt', price: 5 }; // 小于10美元错误

        showTotalPrice(tShirt) // 总价为: 9.075
        showTotalPrice(pant)   // 错误: 价格必须是数值
        showTotalPrice(chips)  // 错误: 低于 10 美元的商品不打折
    }
}
var a = new discount();
// a.run();
