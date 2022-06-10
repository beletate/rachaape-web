import axios from 'axios';
let URL = `https://viacep.com.br/ws/CEP/json/`;

const getCep = async (cepNumber) => {

    try {
        let newURL = URL.replace("CEP", cepNumber);
        return await axios.get(newURL);
    } catch (e) {
        console.error('Ops, tivemos um erro!', e);
        return e;
    }

}

export default getCep;