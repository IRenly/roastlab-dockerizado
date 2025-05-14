import axios from "axios";

export function GetCodigoMun(mun_id, setCodigoMun){
    axios.post(`${import.meta.env.VITE_API_URL}/codemun`,{idmun:mun_id}).then((response)=>{
        console.log(response);
        setCodigoMun(response.data)
    })
}
