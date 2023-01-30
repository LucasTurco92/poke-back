const axios = require('axios');

const requestHandler = async (type, url)=>{
    try {
        const { data } = await axios[type](url);
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
};




module.exports = requestHandler;