import Choicer from "./choicer";
import { ReplacesT } from "./types";


export default class Line {

    line: string;

    constructor(line: string){
        if(!line) throw "Line is empty";
        this.line = line;
    }

    toString(replaces?: ReplacesT){

        let line = this.line;

        for(let key in replaces){
            
            let value = replaces[key];
            line = line.replace(':' + key, value);
        }
        
        return line.trim();     

    }


    choice(count: number){

        const choicer = new Choicer(this.line);
        const line = choicer.get(count);
        return new Line(line);

    }


}