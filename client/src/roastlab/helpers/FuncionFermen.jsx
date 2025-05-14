

export function App(Tipo, Tiempo, fermentcaion, setFermentacion) {
  
    const agregarDato = () => {
      const nuevoDato = {
        Tipo: Tipo,
        Tiempo: Tiempo
      };
  
      // Agregar el nuevo dato al objeto JSON existente
      setFermentacion(() => ({
        ...fermentcaion,
        ...nuevoDato
      }));
    };
   
    agregarDato()
}