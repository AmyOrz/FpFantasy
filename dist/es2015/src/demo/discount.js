import { Maybe } from "../types/Maybe";
import { Left, Right } from "../types/Either";
import * as w from 'wonder-lodash';
var discount = (function () {
    function discount() {
    }
    discount.prototype.run = function () {
        var taxPrice = w.curry(function (tax, price) {
            if (!w.isNumber(price)) {
                return Left.of("you input price is error");
            }
            else {
                return Right.of(price + (tax * price));
            }
        });
        var discount = w.curry(function (dis, price) {
            if (!w.isNumber(price))
                return Left.of("you input price is error");
            if (price < 10)
                return Left.of("you input price is lt 10");
            return Right.of(price - (price * dis));
        });
        var addTenTax = taxPrice(0.1);
        var discount25 = discount(0.25);
        var either = w.curry(function (left, right, m) {
            return m.either(left, right);
        });
        var safeProp = w.curry(function (v, o) {
            return Maybe.of(o[v]);
        });
        var getPrice = safeProp("price");
        var displayTotal = function (total) { console.log('总价为: ' + total); };
        var logError = function (error) { console.log('错误: ' + error); };
        var eitherLogOrShow = either(logError, displayTotal);
        var showTotalPrice = function (item) { return eitherLogOrShow(getPrice(item).chain(addTenTax).chain(discount25)); };
        var tShirt = { name: 't-shirt', price: 11 };
        var pant = { name: 't-shirt', price: '10 美元' };
        var chips = { name: 't-shirt', price: 5 };
        showTotalPrice(tShirt);
        showTotalPrice(pant);
        showTotalPrice(chips);
    };
    return discount;
}());
export { discount };
var a = new discount();
//# sourceMappingURL=discount.js.map