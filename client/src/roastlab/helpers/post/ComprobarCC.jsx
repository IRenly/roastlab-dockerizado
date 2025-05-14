import axios from "axios";

export async function ComprobarCC(valor){

 try{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/Cedula`,{
        Cedula:valor
    })
         //console.log(response.data)

         return response.data
       /* response.data.map((val)=>{
            if(val.cedula){
                setCcper(val.cedula)
            }else{
                setCcper(undefined)
            }
            
        })*/
        
    } catch(error) {
        console.log(error)
    }  
 return ComprobarCC()
}
