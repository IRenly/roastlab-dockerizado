import axios from "axios"

export function GetIdFermentado(setId){
    axios.get(`${import.meta.env.VITE_API_URL}/idFermentacion`).then((response)=>{
           response.data.map(val=>{
            setId(val.id)
           })
    })
}
