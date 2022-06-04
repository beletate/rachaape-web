import axios from 'axios';
import { URL } from './url';
let url = URL;

const getUserByRoom = async (id) => {

    try {
        return await axios.get(`${url}/auth/register/room/${id}`, id);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default getUserByRoom;