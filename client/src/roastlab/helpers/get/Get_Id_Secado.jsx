import axios from "axios";

export function GetIdSecado(setIdsecado){
    axios.get(`${import.meta.env.VITE_API_URL}/idsecado`).then((response=>{
            response.data.map((val)=>{
            setIdsecado(val.id)
            })
    }))
}
