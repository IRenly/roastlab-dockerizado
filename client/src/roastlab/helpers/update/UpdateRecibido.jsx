import axios from "axios";
import Swal from "sweetalert2";

export function UpdateRecibido(idRecibido,FechaRecep,
    Huemdad,
    A_W,
    Factor,
    Densidad,
    Color,
    Grados_B,
    P_H,
    Acidez,
    Info,cultivo){
      axios.put(`${import.meta.env.VITE_API_URL}/Updaterecibido`,{
            idRecibido:idRecibido,
            FechaRecep:FechaRecep,
            Huemdad:Huemdad,
            A_W:A_W,
            Factor:Factor,
            Densidad:Densidad,
            Color:Color,
            Grados_B:Grados_B,
            P_H:P_H,
            Acidez:Acidez,
            Info: Info,
            cultivo:cultivo
      }).then(() => {
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i> La información de la caracterización fisicoquímica se acualizó con éxito</i> `,
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
