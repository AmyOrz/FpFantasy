import curry from "wonder-lodash/curry";
import {Maybe} from "../types/Maybe";
import {props} from "../types/utils";
export class parse{
    run(){
        let joeUser = {
            name: 'joe',
            email: 'joe@example.com',
            prefas: {
                languages: {
                    primary: 'sp',
                    secondary: 'en'
                }
            }
        };
        let indexURLs = {
            'en': 'http://mysite.com/en',  //English
            'sp': 'http://mysite.com/sp', //Spanish
            'jp': 'http://mysite.com/jp'   //Japanese
        }

        var showPage = (url)=>{
            // window.location.href = url;
            console.log(url)
        };

        var maybeGetUrl = curry((allUrls,language)=>{
            return Maybe.of(allUrls[language]);
        })(indexURLs);

        var getUserPrimary = (user)=>{
            //noinspection TypeScriptValidateTypes
            return Maybe.of(user).chain(props(["prefas","languages","primary"])).chain(maybeGetUrl);
        };

        var root = (user)=>{
            showPage(getUserPrimary(user).getOrElse("http://fckthis.com"));
        };

        root(joeUser);
    }
}
var a = new parse();
// a.run();
