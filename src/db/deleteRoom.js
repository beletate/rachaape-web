import axios from 'axios';
import { URL } from './url';
let url = URL;

const deleteRoom = async (id) => {

    try {
        return await axios.delete(`${url}/room/delete/${id}`);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default deleteRoom;