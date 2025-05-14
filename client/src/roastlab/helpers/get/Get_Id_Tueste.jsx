import axios from "axios"

export async function GetIdTueste(setid){
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/idtueste`)
         response.data.map((val)=>{
           
            setid(val.id)
         })
        

    }catch(err){
        console.log(err)
    }
}
