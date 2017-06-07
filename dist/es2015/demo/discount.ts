import {Maybe} from "../types/Maybe";
import {Left, Right} from "../types/Either";
import {curry, flowRight, isNumber} from 'wonder-lodash';
import {either, props} from "../types/utils";
export class discount{
    run(){
        var taxPrice = curry(function (tax,price) {
            if(!isNumber(price)){
                return Left.of("you input price is error");
            } else {
                return Right.of(price + (tax * price))
            }
        });

        var discount = curry(function (dis,price) {
           if(!isNumber(price))return Left.of("you input price is error");

            if(price<10)return Left.of("you input price is lt 10");

            return Right.of(price - (price * dis));
        });

        var addTenTax = taxPrice(0.1);
        var discount25 = discount(0.25);

        const displayTotal = (total) => { console.log('总价为: ' + total) };

        const logError = (error) => { console.log('错误: ' + error); };

        const eitherLogOrShow = either(logError, displayTotal);

        var getPriceAndDiscount = function (item) {
            //noinspection TypeScriptValidateTypes
            return Maybe.of(item).chain(props("price")).chain(addTenTax).chain(discount25);
        }

        const showTotalPrice = (item) => eitherLogOrShow(getPriceAndDiscount(item));

        let tShirt = { name: 't-shirt', price: 11 };
        let pant = { name: 't-shirt', price: '10 美元' }; // 错误
        let chips = { name: 't-shirt', price: 5 }; // 小于10美元错误

        showTotalPrice(tShirt) // 总价为: 9.075
        showTotalPrice(pant)   // 错误: 价格必须是数值
        showTotalPrice(chips)  // 错误: 低于 10 美元的商品不打折
    }
}
var a = new discount();
a.run();
