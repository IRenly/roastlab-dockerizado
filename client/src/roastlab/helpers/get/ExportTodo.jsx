import axios from "axios";

export function ExportTodo(Muestra){
  axios({
    method: 'post',
    url:`${import.meta.env.VITE_API_URL}/ExcelColums`,
    data: {
      Muestra: Muestra
    },
    responseType: 'blob'
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'datos.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error al exportar a Excel:', error);
    });

    
}
