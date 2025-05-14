import axios from "axios";

export async function GetIdBeneficio(setIdbeneficio){
  try {
     const response = await  axios.get(`${import.meta.env.VITE_API_URL}/IdBeneficio`)
     response.data.map((val)=>{
       // console.log(val.id)
        setIdbeneficio(val.id)
     })
  } catch (error) {
    console.log(error)
  }
    // axios.get("http://192.168.95.3:3001/IdBeneficio").then((response)=>{
    //     response.data.map((val)=>{
    //        // console.log(val.id)
    //         setIdbeneficio(val.id)
    //     })
    // })
}
