import curry from "wonder-lodash/curry";
import { Maybe } from "../types/Maybe";
import { props } from "../types/utils";
var parse = (function () {
    function parse() {
    }
    parse.prototype.run = function () {
        var joeUser = {
            name: 'joe',
            email: 'joe@example.com',
            prefas: {
                languages: {
                    primary: 'sp',
                    secondary: 'en'
                }
            }
        };
        var indexURLs = {
            'en': 'http://mysite.com/en',
            'sp': 'http://mysite.com/sp',
            'jp': 'http://mysite.com/jp'
        };
        var showPage = function (url) {
            console.log(url);
        };
        var maybeGetUrl = curry(function (allUrls, language) {
            return Maybe.of(allUrls[language]);
        })(indexURLs);
        var getUserPrimary = function (user) {
            return Maybe.of(user).chain(props(["prefas", "languages", "primary"])).chain(maybeGetUrl);
        };
        var root = function (user) {
            showPage(getUserPrimary(user).getOrElse("http://fckthis.com"));
        };
        root(joeUser);
    };
    return parse;
}());
export { parse };
var a = new parse();
a.run();
//# sourceMappingURL=parse.js.map