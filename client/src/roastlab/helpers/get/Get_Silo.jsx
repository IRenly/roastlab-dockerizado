import axios from "axios"

export function GetSilo(setListasilo){
    axios.get(`${import.meta.env.VITE_API_URL}/silo`).then((response)=>{
                setListasilo(response.data)
            })
}
