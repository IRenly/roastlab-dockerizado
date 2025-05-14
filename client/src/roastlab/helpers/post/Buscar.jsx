import axios from "axios"
import Swal from "sweetalert2"
export async function Buscar(buscar, setListaDatos){
   const codigo = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
   try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/BuscarMuestra`,{
        buscar:buscar
    })
    setListaDatos(response.data)
    const condicion = (response.data).length
       if(condicion > 0){

         codigo.fire({
            icon: 'success',
            title: 'Código Encontrado'
          })
       } 
     }catch(error){
        console.log(error.response.data.message)
        codigo.fire({
         icon: 'question',
         title: 'Verifica el Código!!!'
       })
     }
     
}
