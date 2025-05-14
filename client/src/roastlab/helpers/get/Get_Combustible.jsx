import axios from "axios"

export function GetCombustible(setlist_combus){
    axios.get(`${import.meta.env.VITE_API_URL}/combustible`).then((response)=>{
                setlist_combus(response.data)
            })
}
