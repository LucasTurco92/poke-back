import NodeCache from "node-cache";
let cache = new NodeCache();

export const cacheHandler = () =>{

    const setValue = (key,value)=>{
        cache.set(key, value, 60, (err)=> {
            if (err) {
                console.log('setValue',err);
            }
        });
    }

    const getValue = (key)=>{
        return cache.get(key, (err, value)=> {
            if (err) {
                console.log(err);
            }
        return value;
        });
    }

    return {setValue,getValue};
}