import axios from "axios";
import { ContadorMuestras } from "./ContadorMuestras";


export async function Get_codigo(cedula, setId,  CodigoVar, CodigoBen, setContador,Contador){
  try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/codigo`,{
      cedula: cedula
    })
     const mun= response.data[0]['codigo_mun']
      ContadorMuestras(mun,CodigoVar, CodigoBen,setContador)
     setId(mun+"-"+CodigoVar+"-"+CodigoBen+"-"+Contador)


  }catch (error){
    //console.log(Idbeneficio)
    console.log(error)
  }
    // .then((response)=>{
    //     console.log(response.data)
    //     response.data.map(val=>{
    //       console.log(val)
    //       setIdMuestra(val.codigo_mun)
    //     })
    // }).catch(()=>{

    // })
}
