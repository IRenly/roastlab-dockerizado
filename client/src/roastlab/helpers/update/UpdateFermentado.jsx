import axios from "axios";
import Swal from "sweetalert2";

export function UpdateFermentado(Temperatura,
    fermentacion,
    pH,
    GradosBrix,
    MicroOrganismos,
    culturin,InfoMicroOrganismos,Infoculturin,
    cultivo,
    Id){
    axios.put(`${import.meta.env.VITE_API_URL}/updateFermentacion`,{
        Temperatura: Temperatura,
        Fermentacion: fermentacion,
        pH: pH,
        GradosBrix: GradosBrix,
        MicroOrganismos: MicroOrganismos,
        culturin: culturin,
        InfoMicroOrganismos:InfoMicroOrganismos,
        Infoculturin:Infoculturin,
        cultivo:cultivo,
        Id:Id
        }).then(() => {
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i> La información del fermentado se actualizó con éxito</i> `,
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
