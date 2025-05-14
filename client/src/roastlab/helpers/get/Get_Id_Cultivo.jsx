import axios from "axios";

export function GetIdCultivo(setId){
    axios.get(`${import.meta.env.VITE_API_URL}/idcultivo`).then((response)=>{
           response.data.map(val=>{
            setId(val.id)
           })
    })
}
