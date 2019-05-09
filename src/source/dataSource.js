import axios from 'axios';

export const get = async (url) => {
    try {
        return await axios.get(url);
    }catch (e) {
        console.error(e);
    }
};