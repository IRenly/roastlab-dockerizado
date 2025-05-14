import axios from "axios";


export async function Validacion(username,password,seterr , login, inicio){
  
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          username,
          password,
        });
        if (response.data) {
            const { data } = response.data
            const res = data[0]
          document.cookie = `token=${response.data.token}; path=/;`;
          seterr(false)
          login(res);
          inicio(true)
          //onLogin(); 
        }
      } catch (error) {
        
        seterr(true)
      }
}
