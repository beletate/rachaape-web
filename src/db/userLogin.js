import axios from 'axios';
import { URL } from './url';
let url = URL;

const userLogin = async (obj) => {
    try {
        return await axios.post(`${url}/auth/register/login`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default userLogin;