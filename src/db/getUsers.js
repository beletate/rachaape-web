import axios from 'axios';
let URL = "http://localhost:3000";

const getUser = async () => {

    try {
        axios.get(`${URL}/auth/register`).then(response => {
            if (response.data.length) {
                return response.data;
            }
        })
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    } 
    
}

export default getUser;