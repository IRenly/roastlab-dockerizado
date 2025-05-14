import axios from "axios"

export function GetUltimas3Muestras(setData){
    axios.get(`${import.meta.env.VITE_API_URL}/muestras`).then((response)=>{
          setData(response.data)
        })
}
