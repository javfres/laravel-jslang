
//
// Autoexec function
//
((dict) => {
    
    //
    // This is only supposed to work in a browser
    //
    if(typeof window === 'undefined'){
        console.err("JsLang: Not in browser");
        return;
    }
    
    //
    // Set the functions into the window object
    //
    window.trans = trans;
    window.trans_choice = trans_choice;


    //
    // Divide a key in components
    //
    function divide_key(key){
        
        if(!key.includes('::')){
            key = '*::' + key;
        }
        
        key = key.replace('::','.');
        
        return key.split('.');
    
    } // divide_key
    
    
    //
    // Get a line by its key
    //
    function getLine(key){
        
        const path = divide_key(key);
        
        let current = dict;
        
        for(let i=0; i<path.length; i++){
            if(!(path[i] in current)) return null;
            current = current[path[i]];
        }
        
        return current;
        
    } // getLine


    //
    // Do the replaces in a line
    //
    function do_replaces(line, replaces){
        
        if(!isString(line)) return line;
        
        for(key in replaces){
            
            let value = replaces[key];
            line = line.replace(':' + key, value);
        }
        
        return line.trim();        
    } // do_replaces
    
    
    //
    // The trans function
    //
    function trans(key, replaces = null) {
    
        let line = getLine(key);
        
        if(!line){
            return key;
        }
        
        if(replaces){
            line = do_replaces(line, replaces);
        }
        
        return line;
    }; // trans
    
    
    //
    // The trans_choice function
    //
    function trans_choice(key, count = 1, replaces = {}) {
        
        if(!isNaN(count)){
            count = +count;
        } else {
            count = count.length;
        }
    
        let line = getLine(key);
        
        if(!line){
            return key;
        }
        
        //
        // Add count to replaces
        //
        if(! replaces.hasOwnProperty('count')){
            replaces.count = count;
        }
        
        const choicer = new Choicer(line);
        line = choicer.get(count)
        
        if(!line){
            return key;
        }
        
        line = do_replaces(line, replaces);

        return line;
        
    }; // trans_choice
    
    
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
    
    
    
    //
    // Utils
    //
    function isString(x) {
        return Object.prototype.toString.call(x) === "[object String]"
    }

    
})(JsLang_DICT); // End of Autoexec function