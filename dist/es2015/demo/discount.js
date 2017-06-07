import { Maybe } from "../types/Maybe";
import { Left, Right } from "../types/Either";
import { curry, isNumber } from 'wonder-lodash';
import { either, props } from "../types/utils";
var discount = (function () {
    function discount() {
    }
    discount.prototype.run = function () {
        var taxPrice = curry(function (tax, price) {
            if (!isNumber(price)) {
                return Left.of("you input price is error");
            }
            else {
                return Right.of(price + (tax * price));
            }
        });
        var discount = curry(function (dis, price) {
            if (!isNumber(price))
                return Left.of("you input price is error");
            if (price < 10)
                return Left.of("you input price is lt 10");
            return Right.of(price - (price * dis));
        });
        var addTenTax = taxPrice(0.1);
        var discount25 = discount(0.25);
        var displayTotal = function (total) { console.log('总价为: ' + total); };
        var logError = function (error) { console.log('错误: ' + error); };
        var eitherLogOrShow = either(logError, displayTotal);
        var getPriceAndDiscount = function (item) {
            return Maybe.of(item).chain(props("price")).chain(addTenTax).chain(discount25);
        };
        var showTotalPrice = function (item) { return eitherLogOrShow(getPriceAndDiscount(item)); };
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
a.run();
//# sourceMappingURL=discount.js.map