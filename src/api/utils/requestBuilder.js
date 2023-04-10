import axios from 'axios';

export const requestBuilder = async (type, url)=>{
    try {
        const { data } = await axios[type](url);
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
};
