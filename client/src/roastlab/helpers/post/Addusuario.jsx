import axios from "axios";
import Swal from "sweetalert2";


export async function Addusuario (Cedula, Nombre, Telefono, Email, Genero, Municipio, setEstadobutton, setEstadolectura, setMenuProduccion) {
    try{
       const response= await axios.post(`${import.meta.env.VITE_API_URL}/create`, {
          Cedula: Cedula,
          Nombre: Nombre,
          Tel: Telefono,
          Email: Email,
          Genero: Genero,
          Municipio: Municipio,
        }) 
            setMenuProduccion(true);
            setEstadobutton(true);
            setEstadolectura(true);
            Swal.fire({
              title: "<strong>Registro exitoso</strong>",
              html: `<i> El usuario ${Nombre} fue registrado con exito</i> `,
              icon: "success",
              timer: 3000,
           
          })}
          catch(error){
            // console.log('Error del backend:', error)
            if(error.message === "Network Error"){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text:"Intente mas tarde"
              });
            }
            if(error.code === 'ERR_BAD_RESPONSE'){
             Swal.fire({
                icon: "error",
                title: "Oops...",
                text:`la cedula ${Cedula} ya se encuentra registrada`
              });

            }
          
          }
     
}

export default Addusuario
