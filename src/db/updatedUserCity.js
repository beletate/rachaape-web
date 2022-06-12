import axios from 'axios';
import { URL } from './url';
let url = URL;

const updatedUserCity = async (id, city) => {
    try {
        return await axios.patch(`${url}/auth/city/${id}`, city);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default updatedUserCity;