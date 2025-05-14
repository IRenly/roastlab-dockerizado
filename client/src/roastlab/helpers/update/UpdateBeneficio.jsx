import axios from "axios";
import Swal from "sweetalert2";

export function UpdateBeneficio(Idbeneficio,Idcultivo,
    IdTipo,
    IdFermentado,
   IdSecado){
    axios.put(`${import.meta.env.VITE_API_URL}/UpdateBeneficio`,{
        Idbeneficio: Idbeneficio,
        Idcultivo: Idcultivo,
        IdTipo: IdTipo,
        IdFermentado: IdFermentado,
        IdSecado: IdSecado
    }).then(() => {
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i> los datos del Beneficio se Actualizaron  con exito</i> `,
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function (error) {
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
