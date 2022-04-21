import axios from 'axios';
import { URL } from './url';
let url = URL;

const setUser = async (obj) => {

    try {
        console.log(obj)
        axios.post(`${url}/auth/register`, obj).then(res => {
            if (res) {
                return res;
            }
        })
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    } 
    
}

export default setUser;