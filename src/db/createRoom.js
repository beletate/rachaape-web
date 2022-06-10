import axios from 'axios';
import { URL } from './url';
let url = URL;

const createRoom = async (obj) => {
    try {
        return await axios.post(`${url}/room/register`, obj);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    } 
    
}

export default createRoom;