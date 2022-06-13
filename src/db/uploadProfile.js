import axios from 'axios';
import { URL } from './url';
let url = URL;

const uploadProfile = async (id, obj) => {
    try {
        return await axios.patch(`${url}/auth/register/${id}`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default uploadProfile;