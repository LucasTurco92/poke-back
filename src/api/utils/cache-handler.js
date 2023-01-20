var NodeCache = require("node-cache");
let cache = new NodeCache();

const cacheHandler = () =>{

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

module.exports = cacheHandler;