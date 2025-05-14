import axios from 'axios';

export function ContadorMuestras(CodigoMun,CodigoVar,CodigoBen, setContador){
    axios.post(`${import.meta.env.VITE_API_URL}/contador`,{ var:CodigoVar, mun:CodigoMun, ben:CodigoBen}).then((response)=>{
        const count = response.data[0]['COUNT(*)']
       
        setContador(count)
    })
}
