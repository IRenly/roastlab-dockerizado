import axios from "axios";
import Swal from "sweetalert2";

 export function AddSecado(Temp_secado,
    Humeda_relativa,
    Temp_hambiente,
    secado,
    Id_combus,
    Idsilo,
    Secado_continuo, cultivo, setmenusig,  setEstadobutton,setEstadolectura){
      
    axios.post(`${import.meta.env.VITE_API_URL}/Secado`,{
        Temp_secado:Temp_secado,
        Humeda_relativa:Humeda_relativa,
        Temp_hambiente: Temp_hambiente,
        Tipo_secado: secado,
        Id_combus: Id_combus,
        Idsilo:Idsilo,
        Secado_continuo:Secado_continuo,
        cultivo:cultivo
      }).then(() => {
        setmenusig(true)
        setEstadobutton(true)
        setEstadolectura(true)
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i> La información del secado para la muestra ${cultivo} se agregó con éxito </i> `,
          icon: "success",
          timer: 3000,
        });
      }).catch(function (error) {
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
