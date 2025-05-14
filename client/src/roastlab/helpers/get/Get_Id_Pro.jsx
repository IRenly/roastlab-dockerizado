import axios from "axios";

export function GetIdPro( Ccper, setId){
    axios.post(`${import.meta.env.VITE_API_URL}/area_pro`, { C: Ccper }).then(
      (response) => {
        response.data.map((val=>{
          setId(val.id)
        }))
        
      }
      
    );
}
