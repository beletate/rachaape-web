import axios from 'axios';
import { URL } from './url';
let url = URL;

const editRoom = async (id, room) => {

    try {
        return await axios.patch(`${url}/room/edit/${id}`, room);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default editRoom;