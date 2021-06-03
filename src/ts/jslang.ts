import ajax from "./ajax";
import { DictsT, ManifestT, ReplacesT } from "./types";
import Dictionary from "./dictionary";


export default class JSLang {

    static manifest: ManifestT = {};

    static locale = 'en';

    static locales = ['en'];

    static dicts: DictsT = {}; 
    

    static trans(key: string, replaces?: ReplacesT){

        const dict = JSLang.dicts[JSLang.locale];
        if(!dict){
            console.error("No dict for " + JSLang.locale);
            return '???????';
        }

        const line = dict.getLine(key);
        
        if(!line){
            return key;
        }
        
        return line.toString(replaces);
    
    }
    
    static trans_choice(key: string, count_or_array: number|any[], replaces?: ReplacesT){
        

        const count = Array.isArray(count_or_array) ?
            count_or_array.length :
            count_or_array;

            const dict = JSLang.dicts[JSLang.locale];
            if(!dict){
                console.error("No dict for " + JSLang.locale);
                return '???????';
            }

        const line = dict.getLine(key);

        if(!line){
            return key;
        }

        const line2 = line.choice(count);

        return line2.toString({...replaces, count});
    
    }


    static init(currentLocale: string, manifest: ManifestT, currentDict: any){

        JSLang.manifest = manifest;

        JSLang.locales = Object.keys(JSLang.manifest);

        JSLang.dicts[currentLocale] = new Dictionary(currentDict);
        
        JSLang.setLocale(currentLocale);

    }


    static async setLocale(locale: string){

        if(!JSLang.locales.includes(locale)){
            throw new Error(`Locale not available '${locale}'`);
        }

        if(!JSLang.dicts[locale]){
            await JSLang.loadLocale(locale);
        }

        JSLang.locale = locale;
    }

    static async loadLocale(locale: string){

        if(!JSLang.locales.includes(locale)){
            throw new Error(`Locale not available '${locale}'`);
        }

        const url = JSLang.manifest[locale];

        const text = await ajax(url);

        const data = eval(`(function dummy(){ ${text};  return JSLang_CURRENT_DICT; })();`);

        JSLang.dicts[locale] = new Dictionary(data);

    }

    static declareGlobal(){

        // @ts-ignore
        window.trans = JSLang.trans;

        // @ts-ignore
        window.trans_choice = JSLang.trans_choice;

    }

    
}