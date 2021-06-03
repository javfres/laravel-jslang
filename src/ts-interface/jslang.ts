/* tslint:disable */

type ReplacesT = {[id: string]: any};
type ChoiceT = number | (any[]);


interface JSLangI {

    locale: string;
    locales: string[];
    setLocale(locale: string): Promise<void>;
    trans(key: string, replaces?: ReplacesT): string;
    trans_choice(key: string, choice: ChoiceT, replaces?: ReplacesT): string;

}


export function getJSLangInstance(): JSLangI {

    // @ts-ignore
    if(!window.JSLang){
        console.error("JSLang was not loaded");
        throw new Error("JSLang was not loaded");
    }

    // @ts-ignore
    const JSLang = window.JSLang as JSLangI;

    return JSLang;

}


export function trans(key: string, replaces?: ReplacesT): string {

    try {
        return getJSLangInstance().trans(key, replaces);
    } catch(e){
        return key;
    }

}

export function trans_choice(key: string, choice: ChoiceT, replaces?: ReplacesT): string {
  
    try {
        return getJSLangInstance().trans_choice(key, choice, replaces);
    } catch(e){
        return key;
    }
    
}

