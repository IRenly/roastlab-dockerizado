import axios from "axios"

export function GetVariedad(setListVariedad){
    axios.get(`${import.meta.env.VITE_API_URL}/variedad`).then((response)=>{
        setListVariedad(response.data)
    })
}
