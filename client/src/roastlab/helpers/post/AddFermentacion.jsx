import axios from "axios";
import Swal from "sweetalert2";

export function AddFermentacion(
  Temperatura,
  fermentacion,
  pH,
  GradosBrix,
  MicroOrganismos,
  culturin,
  InfoMicroOrganismos,
  Infoculturin,
  cultivo,
  setmenusig,
  setEstadobutton,
  setEstadolectura
) {
  axios
    .post(`${import.meta.env.VITE_API_URL}/Fermentacion`, {
      Temperatura: Temperatura,
      Fermentacion: fermentacion,
      pH: pH,
      GradosBrix: GradosBrix,
      MicroOrganismos: MicroOrganismos,
      culturin: culturin,
      InfoMicroOrganismos: InfoMicroOrganismos,
      Infoculturin: Infoculturin,
      cultivo: cultivo,
    })
    .then(() => {
      setmenusig(true);
      setEstadobutton(true);
      setEstadolectura(true);
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La información del fermentado para la muestra ${cultivo} se agregó con éxito </i> `,
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
            : "salio mal",
        // : JSON.parse(JSON.stringify(error)).message,
      });
    });
}
