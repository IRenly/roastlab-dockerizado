import axios from "axios";
import Swal from "sweetalert2";

export function UpdateProduccion(
  Id,
  Area_Cul,
  Tipo_pro,
  Vereda,
  Coordenadas,
  setmenuCultivo,
  setEstadolectura
) {
  axios.put(`${import.meta.env.VITE_API_URL}/updateProduccion`, {
      Id: Id,
      Area_Cul: Area_Cul,
      Tipo_pro: Tipo_pro,
      Vereda: Vereda,
      Coordenadas: Coordenadas,
    })
    .then(() => {
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La información de producción se actualizó con éxito</i> `,
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
