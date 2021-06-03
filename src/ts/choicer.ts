

//
// Utility classes for the trans_choice
//

interface Selector {
    contains(x:number): boolean;
}


class Range implements Selector {

    a: number|null = null;
    b: number|null = null;

    constructor(a: string, b: string){
        this.a = isNaN(parseInt(a)) ? null : +a;
        this.b = isNaN(parseInt(b)) ? null : +b;
    }

    contains(x:number){

        if(this.a === null && this.b === null){
            return true;
        } else if(this.a === null){
            return x <= this.b;
        } else if(this.b === null) {
            return x >= this.a;
        }
        
        return this.a<=x && this.b>=x;
    } // contains
};

class List implements Selector {

    list: number[];

    constructor(arr: (string|number)[]){            
        this.list = arr.map(x => +x);
    }
    contains(x: number){
        for(let i=0; i<this.list.length; i++){
            if(this.list[i] === x) return true;
        }
        return false;
    }
};

class Rest implements Selector {
    contains(x:number){ 
        return true;
    }
};


type Option = {
    selector: Selector;
    line: string;
};



//
// The class that does the magic of the trans_choice function
//
export default class Choicer {

    options: Option[];
    
    constructor(line: string){
                    
        this.options = [];
                    
        line.split('|').map( (line, i) => {
            line = line.trim();
            if(!line.length) return;
            
            let option = this.process_line(line);
            
            if(!option.selector){
                
                if(i === 0){
                    option.selector = new List([1]);
                } else {
                    option.selector = new Rest();

                }
            }
            
            this.options.push(option);
        });
        
    }
    
    process_line(line: string): Option {


        if(line[0] === '{'){
            let parts = line.substring(1).split('}');
            let nums = parts[0].split(',');
            line = parts[1].trim();

            let selector = new List(nums);
            
            return {
                selector,
                line
            };

        }
        
        if(line[0] === '['){
            
            let parts = line.substring(1).split(']');
            let nums = parts[0].split(',');
            line = parts[1].trim();
            let selector = new Range(nums[0], nums[1]);
            
            return {
                selector,
                line
            };

        }
        
        return {
            selector: null,
            line: line
        };
        
        
    }
    
    
    get(count: number){
        
        if(this.options.length === 1)
            return this.options[0].line;
        
        for(let i=0; i<this.options.length; i++){                
            if(this.options[i].selector.contains(count)){
                return this.options[i].line;
            }
        }
        
        return null;
        
    }
    
} // class