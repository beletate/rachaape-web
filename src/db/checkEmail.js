import axios from 'axios';
import { URL } from './url';
let url = URL;

const checkEmail = async (obj) => {

    try {
        return await axios.get(`${url}/auth/register/${obj.email}`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default checkEmail;