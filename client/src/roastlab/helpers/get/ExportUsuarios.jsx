import axios from "axios";

export function ExportUsuarios(){
    axios.get(`${import.meta.env.VITE_API_URL}/ExcelPersonas`,{responseType: 'blob'}).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'personas.xlsx');
        document.body.appendChild(link);
        link.click();
      }).catch(error => {
        console.error('Error al exportar a Excel:', error);
      });
}
