import axios from "axios"

export function GetTipoBeneficio(setlistaTipo){
    axios.get(`${import.meta.env.VITE_API_URL}/Tipobeneficio`).then((response)=>{
          setlistaTipo(response.data)
        })
}
