import axios from "axios";
import Swal from "sweetalert2";

export function AddBeneficio(Idcultivo,
    IdTipo,
    IdFermentado,
   IdSecado,setMenuRecibido,setEstadobutton,setEstadolectura){
    axios.post(`${import.meta.env.VITE_API_URL}/Addbeneficio`,{
        Idcultivo: Idcultivo,
        IdTipo: IdTipo,
        IdFermentado: IdFermentado,
       IdSecado: IdSecado
    }).then(() => {
        setMenuRecibido(true)
        setEstadobutton(true)
        setEstadolectura(true)
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i> La información del beneficio se agregó con éxito </i> `,
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
