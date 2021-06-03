import Line from "./line";


//
// Divide a key in components
//
function divide_key(key: string){
    
    if(!key.includes('::')){
        key = '*::' + key;
    }
    
    key = key.replace('::', '.');
    
    return key.split('.');

} // divide_key




export default class Dictionary {


    data: any;

    constructor(data: any){
        this.data = data;
    }


    getLine(key: string): Line|null {

        const path = divide_key(key);
        
        let current = this.data;
        
        for(let i=0; i<path.length; i++){
            if(!(path[i] in current)) return null;
            current = current[path[i]];
        }
        
        return new Line(current + '');

    }








}