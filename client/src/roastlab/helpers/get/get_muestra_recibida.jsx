import axios from "axios";

export function Get_Muestra_Recibida(setEstado_Muestra,Id){
    axios.post(`${import.meta.env.VITE_API_URL}/cultivoMuestra`,{Id}).then((response)=>{
        response.data.map((val)=>{
            setEstado_Muestra(val.estado_muestra)
        })
    })
}
