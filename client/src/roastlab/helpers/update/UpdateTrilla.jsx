import axios from "axios";
import Swal from "sweetalert2";

 
 export async function UpdateTrilla(idTrilla,Huemdad,
    A_W,
    Factor,
    Densidad,
    Color,
    Grados_B,
    P_H,
    Acidez,
    Info, 
    ){
    try{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/Updatetrilla`,{ 
        idTrilla: idTrilla,
        Huemdad: Huemdad,
        A_W: A_W,
        Factor: Factor,
        Densidad: Densidad,
        Color: Color,
        Grados_B: Grados_B,
        P_H: P_H,
        Acidez: Acidez,
        Info: Info})

        Swal.fire({
            title: "<strong>Registro exitoso</strong>",
            html: `<i> La información de trilla se actualizó con éxito </i> `,
            icon: "success",
            timer: 3000,
          });
    }catch(error){
        console.log(error)
    }
 }
