import axios from "axios";

export async function ListaProduccion( Ccper, setlista){
    await axios.post(`${import.meta.env.VITE_API_URL}/area_pro`, { C: Ccper }).then(
      (response) => {
        setlista(response.data)
        // response.data.map((val=>{
        //   setlista(val)
        // }))
        
      }
      
    );
}
