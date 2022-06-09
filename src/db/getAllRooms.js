import axios from 'axios';
import { URL } from './url';
let url = URL;

const getAllRooms = async (obj) => {

    try {
        return await axios.post(`${url}/room/all/${obj._id}`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default getAllRooms;