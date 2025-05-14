import axios from "axios";
import Swal from "sweetalert2";

export async function AddUser(
  Cedula,
  Nombre,
  Telefono,
  Email,
  Genero,
  Municipio,
  username,
  contraseña
) {
    var success = false
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/create`, {
      Cedula: Cedula,
      Nombre: Nombre,
      Tel: Telefono,
      Email: Email,
      Genero: Genero,
      Municipio: Municipio,
    });
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/catador`, {
        username: username,
        contraseña: contraseña,
        Cedula: Cedula,
      });
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> El usuario ${Nombre} fue registrado con éxito</i> `,
        icon: "success",
        timer: 3000,
      });
      success=true
    } catch (erro) {
      console.log("salio mal jajaja");
    }
  } catch (error) {
    //console.error('Error del backend:', error.response.data)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        JSON.parse(JSON.stringify(error)).message === "Network Error"
          ? "Intente mas tarde"
          : "Esta cédula ya se encuentra registrada",
    });
  }
  return success
}
