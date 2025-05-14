import axios from "axios";
import Swal from "sweetalert2";

export async function AddTueste(
  Huemdad,
  A_W,
  Color,
  Agtrom,
  Densidad,
  Curva_granu,
  idTueste,
  Info,
  Grados_B,
  P_H,
  Acidez,
  IdMuestra,
  setEstadobutton,
  setEstadolectura
) {
  axios
    .post(`${import.meta.env.VITE_API_URL}/Tuesteseco`, {
      Huemdad: Huemdad,
      A_W: A_W,
      Color: Color,
      Agtrom: Agtrom,
      Densidad: Densidad,
      Curva_granu: Curva_granu,
      idTueste: idTueste,
      Info: Info,
      Grados_B: Grados_B,
      P_H: P_H,
      Acidez: Acidez,
      IdMuestra: IdMuestra,
    })
    .then(() => {
      setEstadobutton(true);
      setEstadolectura(true);
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La información del tueste para la muestra ${IdMuestra} se agregó con éxito </i> `,
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
