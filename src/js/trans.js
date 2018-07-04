
//
// Autoexec function
//
((dict) => {
    
    if(typeof window === 'undefined'){
        console.err("JsLang: Not in browser");
        return;
    }
    
    window.trans = trans;

    
    function divide_key(key){
        
        if(!key.includes('::')){
            key = '*::' + key;
        }
        
        key = key.replace('::','.');
        
        return key.split('.');
    
    }
    
    
    function getLine(key){
        
        const path = divide_key(key);
        
        let current = dict;
        
        for(let i=0; i<path.length; i++){
            if(!(path[i] in current)) return null;
            current = current[path[i]];
        }
        
        return current;
    }


    function do_replaces(line, replaces){
        
        for(key in replaces){
            
            let value = replaces[key];
            line = line.replace(':' + key, value);
            
        }
        
        return line;        
    }
    
    
    function trans(key, replaces = null) {
    
        let line = getLine(key);
        
        if(!line){
            return key;
        }
        
        if(replaces){
            line = do_replaces(line, replaces);
        }
        
        return line;
    };
    
    

    
})(JsLang_DICT); // End of Autoexec function