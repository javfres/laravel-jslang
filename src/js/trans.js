
//
// Autoexec function
//
((dict) => {
    
    const Choicer = require('./trans_choicer');
    
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
        
        for(let key in replaces){
            
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
    // Utils
    //
    function isString(x) {
        return Object.prototype.toString.call(x) === "[object String]"
    }

    
})(JsLang_DICT); // End of Autoexec function