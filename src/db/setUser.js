import axios from 'axios';
import { URL } from './url';
let url = URL;

const setUser = async (obj) => {
    try {
        return await axios.post(`${url}/auth/register`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    } 
    
}

export default setUser;