
export default function ajax(url: string): Promise<any> {

    return new Promise((resolve, reject) => {

        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', url, true);
        xobj.onreadystatechange = function() {
            
            if (xobj.readyState !== XMLHttpRequest.DONE) return;

            if(xobj.status !== 200){
                reject();
                return;
            }
            
            const text = xobj.responseText;
            resolve(text);
        
        }
        xobj.send(null);

    });

}
