import axios from "axios";

export function GetIdRecibido(setId){

    axios.get(`${import.meta.env.VITE_API_URL}/idrecibido`).then((response)=>{
        
        response.data.map((val)=>{
            setId(val.id)
        })
    })
}
