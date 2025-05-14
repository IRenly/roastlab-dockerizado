import axios from "axios";
import Swal from "sweetalert2";

export function UpdateCultivo(
  id,
  idVariedad,
  Edad_Cul,
  Altura_SNM,
  Fertilizacion,
  Organico,
  IdTipo,
  estado_muestra,
  Hectareas,
  idProducion
) {
  axios.put(`${import.meta.env.VITE_API_URL}/updateCultivo`, {
    id: id,
    idVariedad: idVariedad,
    Edad_Cul: Edad_Cul,
    idProducion: idProducion,
    Altura_SNM: Altura_SNM,
    Fertilizacion: Fertilizacion,
    Organico: Organico,
    IdTipo:IdTipo,
    estado_muestra: estado_muestra,
    Hectareas: Hectareas,
  })
    .then(() => {
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La información del cultivo se actualizó con éxito </i> `,
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
