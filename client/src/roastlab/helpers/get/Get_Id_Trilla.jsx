import axios from "axios";

export async function GetIdTrilla(setIdtrilla){
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/idtrilla`)
        response.data.map((val)=>{
            setIdtrilla(val.id)
        })
    }catch(error){
        console.log(error)
    }
}
