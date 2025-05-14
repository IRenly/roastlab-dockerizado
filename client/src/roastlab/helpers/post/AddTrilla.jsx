import axios from "axios";
import Swal from "sweetalert2";

export async function AddTrilla(Huemdad,
    A_W,
    Factor,
    Densidad,
    Color,
    Grados_B,
    P_H,
    Acidez,
    Info, IdMuestra, setEstadobutton,
    setEstadolectura){
        console.log(IdMuestra)
    try{
       
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Trilla`,{
            IdMuestra: IdMuestra,
            Huemdad: Huemdad,
            A_W: A_W,
            Factor: Factor,
            Densidad: Densidad,
            Color: Color,
            Grados_B: Grados_B,
            P_H: P_H,
            Acidez: Acidez,
            Info: Info
        })
         setEstadobutton(true)
         setEstadolectura(true)
        Swal.fire({
            title: "<strong>Registro exitoso</strong>",
            html: `<i> La información de la trilla para la muestra ${IdMuestra} se agregó con éxito </i> `,
            icon: "success",
            timer: 3000,
          });
        
    }catch(error){
        console.log(error)
    }
}
