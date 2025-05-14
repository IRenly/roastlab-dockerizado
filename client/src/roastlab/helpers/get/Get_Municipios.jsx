import axios from "axios";

export function GetMunicipios(setlistMunicipio){
    axios.get(`${import.meta.env.VITE_API_URL}/municipio`).then((response)=>{
        setlistMunicipio(response.data)
    })
}
