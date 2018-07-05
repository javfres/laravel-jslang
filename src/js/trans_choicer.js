//
// The class that does the magic of the trans_choice function
//
class Choicer {
    
    constructor(line){
                    
        this.options = [];
                    
        line.split('|').map( (line,i) => {
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
    
    process_line(line){
        
        
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
    
    
    get(count){
        
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



//
// Utility classes for the trans_choice
//

class Range {
    constructor(a,b){
        this.a = a.trim() === '*' ? null : +a;
        this.b = b.trim() === '*' ? null : +b;
    }
    contains(x){
        
        if(this.a === null) return x <= this.b;
        if(this.b === null) return x >= this.a;

        return this.a<=x && this.b>=x;
    }
};

class List {
    constructor(arr){            
        this.list = arr.map(x => +x);
    }
    contains(x){
        for(let i=0; i<this.list.length; i++){
            if(this.list[i] === x) return true;
        }
        return false;
    }
};

class Rest {
    contains(x){ return true; }
};

module.exports = Choicer;
