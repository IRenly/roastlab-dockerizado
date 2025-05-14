import axios from "axios";


export async function Promedios(Muestra, setLista) {
  try {
    console.log("Enviando muestra:", Muestra);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/promediosMuestra`,
      { Muestra }
    );
    console.log("Respuesta:", response.data);
    setLista(response.data);
    return response;
  } catch (error) {
    console.error("Error desde Axios:", error.response?.data || error);
  }
}

