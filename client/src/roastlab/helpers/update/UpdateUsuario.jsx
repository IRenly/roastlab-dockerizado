import axios, { Axios } from "axios";
import Swal from "sweetalert2";

export function UpdateUsuario (Cedula, Nombre, Telefono, Email, Genero, Municipio,  setEstadolectura, setMenuProduccion){
    axios.put(`${import.meta.env.VITE_API_URL}/updatepersona`,{
       Nombre :Nombre,
     Cedula :Cedula,
     Telefono :Telefono,
     Email :Email,
     Genero: Genero,
     Municipio :Municipio
    }).then(() => {
      Swal.fire({
        title: "<strong>Actualización exitosa</strong>",
        html: `<i> El usuario ${Nombre} fue actualizado </i> `,
        icon: "success",
        timer: 3000,
      });
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "Intente mas tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    });
}
