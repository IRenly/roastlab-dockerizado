import axios from "axios";
import Swal from "sweetalert2";

export async function UpdateTueste(
  Id,
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
  IdMuestra
) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/UpdateTueste`, {
      Id: Id,
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
    });
    Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La informacion de Tueste para la muestra ${IdMuestra} se actualizó correctamente </i> `,
        icon: "success",
        timer: 3000,
      });
  } catch (err) {
    console.log(err);
  }
}
