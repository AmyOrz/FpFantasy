import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import {Maybe} from "../types/Maybe";
import {chain, map} from "../../test/unit/utils";
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
        var trace = curry((x,f)=>{
            console.log(x,"--->",f);
            return f;
        })

        var showPage = (url)=>{
            // window.location.href = url;
            console.log(url);
        };

        var prop = curry((v,o)=>{
            return Maybe.of(o[v]);
        });

        var maybeGetUrl = curry((allUrls,language)=>{
            return Maybe.of(allUrls[language]);
        })(indexURLs);

        var getLanguageForUser = (user)=>{
            //noinspection TypeScriptValidateTypes
            return Maybe.of(user).chain(flowRight(trace("over"),chain(prop("primary")),chain(prop("languages")),prop("prefs"))).chain(maybeGetUrl);
        };

        function main(user){

            showPage(getLanguageForUser(user).getOrElse("http://mysite.com/en"))
        }

        main(joeUser);
    }
}
var a = new parse();
// a.run();
