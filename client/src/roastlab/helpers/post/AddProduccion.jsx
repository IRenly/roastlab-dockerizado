import axios from "axios";
import Swal from "sweetalert2";

export function AddProduccion(Area_Cul, Tipo_pro, Vereda, Coordenadas, Ccper, setEstadobutton, setEstadolectura,setmenuCultivo){
    axios.post(`${import.meta.env.VITE_API_URL}/producion`, {
        Area_Cul: Area_Cul,
        Tipo_pro: Tipo_pro,
        Vereda: Vereda,
        Coordenadas: Coordenadas,
        Ccper: Ccper,
      })
        .then(() => {
          setmenuCultivo(true);
          setEstadobutton(true);
          setEstadolectura(true);
          Swal.fire({
            title: "<strong>Registro exitoso</strong>",
            html: `<i> La información de producción para el usuario identificado con C.C ${Ccper} se almacenó con éxito</i> `,
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
