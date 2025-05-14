import axios from "axios";
import Swal from "sweetalert2";

export function AddRecibido(
  FechaRecep,
  Huemdad,
  A_W,
  Factor,
  Densidad,
  Color,
  Grados_B,
  P_H,
  Acidez,
  Info,
  cultivo,
  setmenusig,
  setEstadobutton,
  setEstadolectura
) {
  axios
    .post(`${import.meta.env.VITE_API_URL}/recibido`, {
      FechaRecep: FechaRecep,
      Huemdad: Huemdad,
      A_W: A_W,
      Factor: Factor,
      Densidad: Densidad,
      Color: Color,
      Grados_B: Grados_B,
      P_H: P_H,
      Acidez: Acidez,
      Info: Info,
      cultivo: cultivo,
    })
    .then(() => {
      setmenusig(true);
      setEstadobutton(true);
      setEstadolectura(true);
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La información del recibido para la muestra ${cultivo} se agregó con éxito </i> `,
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
