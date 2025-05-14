import axios from "axios";
import Swal from "sweetalert2";

export function AddCultivo(
  id,
  idVariedad,
  Edad_Cul,
  idProducion,
  Altura_SNM,
  Fertilizacion,
  Organico,
  IdTipo,
  estado_muestra,
  Hectareas,
  setmenusig,
  setEstadobutton,
  setEstadolectura
) {
  axios
    .post(`${import.meta.env.VITE_API_URL}/Cultivo`, {
      Id: id,
      Variedad: idVariedad,
      Edad_cul: Edad_Cul,
      Producion: idProducion,
      Altura_SNM: Altura_SNM,
      Fertilizacion: Fertilizacion,
      Organico: Organico,
      IdTipo: IdTipo,
      estado_muestra: estado_muestra,
      Hectareas: Hectareas,
    })
    .then(() => {
      setmenusig(true);
      setEstadobutton(true);
      setEstadolectura(true);
      Swal.fire({
        icon: "info",
        title: "Nuevo Codigo",
        text: `${id}`,
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
