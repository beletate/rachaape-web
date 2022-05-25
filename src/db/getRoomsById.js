import axios from 'axios';
import { URL } from './url';
let url = URL;

const getRoomsById = async (obj) => {

    try {
        return await axios.get(`${url}/room/owner/${obj._id}`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default getRoomsById;