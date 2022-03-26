import axios from 'axios';
let URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/UF/municipios";

const getCities = async (uf) => {

    try {
        let newURL = URL.replace("UF", uf);
        const response = await axios.get(newURL);
        return { response };
    } catch (e) {
        console.log('Ops, tivemos um erro!', e);
        return e;
    }

}

export default getCities;