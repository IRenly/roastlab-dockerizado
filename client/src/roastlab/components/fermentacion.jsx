import { useEffect, useState } from "react"
import Swal from "sweetalert2"



export const Fermentacion = ({num, tiem ,Tiempo, tip ,Tipo, setFermentacion, estadolectura, lista}) => {
const [list, setlist] = useState(['Tradicional','Sumergido', 'Anaeróbico', 'Maceración', 'CO2'])
const [tipo, setTipo] = useState(tip)
const [tiempo, settiempo] = useState(tiem)
const [lectura, setlectura] = useState(false)
const [boton, setboton] = useState(false)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
useEffect(()=>{
  setlectura(estadolectura)
  if(lista ==="secado"){
    setlist(['Mecánico',
    'Solar',
      'Intermitente',
      'Mecánico y solar',
     'Solar y mecánico',
      'Liofilización',
      'Bomba de calor',
      'Ventana refractante',
      'Aire deshumidificado',])
  }
},[estadolectura, lista])
useEffect(()=>{
  if(tip !== undefined && tiem !==undefined){
    AgregarFermentacion()
  }
},[1])

 
 const AgregarFermentacion = () =>{
 
  if(tipo !== undefined && tiempo !== undefined)
  {setboton(true)
  Tipo(tipo)
   Tiempo(tiempo)
   
  }
}
const UpFermentacion = () =>{
  const updatedObj = { tipo: tipo, tiempo: tiempo };
  Toast.fire({
    icon: 'success',
    title: 'Actualizado'
  })
  setFermentacion((prev)=>{
    const update = [...prev]
    update[num] = updatedObj;
    return update
  })

}


  return (
    <>
    <div className="input-group m-3">
              <span className="input-group-text  col-2 " id="basic-addon1">
                *Tipo  :{""}
              </span>
              {tipo === undefined ? (
                
                  <button
                    className="btn btn-outline-secondary dropdown-toggle col-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={lectura}
                    defaultValue={tipo || ""}
                    
                  >
                    {"Selecionar Tipo"}
                  </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={lectura}
                  defaultValue={tipo || ""}
                  
                >
                  {tipo}
                </button>
              )}<ul  className="dropdown-menu">
                  {
                  list.map((val,i) => {
                return(
                <li key={i}
                  className="dropdown-item"
                  onClick={() => {
                    setTipo(val);
                    
                  }}
                >
                  {val}
                </li>
                )})}
              </ul>
              <span className="input-group-text col-2  " id="basic-addon1">
                *Tiempo: {"(Horas)"}
              </span>
              <input
                type="number"
                value={tiempo || ""}
                onChange={(event) => {
                  settiempo(event.target.value);
                  
                }}
                readOnly={lectura}
                className="form-control"
                placeholder="Horas"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
               <div className="d-grid gap-2 d-md-flex justify-content-md-end">
               { !boton?
               
               <button
                className="btn btn-primary me-md-2"
                type="button"
                disabled={lectura}
               onClick={()=>{ 
                AgregarFermentacion()}}
               
              >
              +
              </button> :
              <button
              className="btn btn-success me-md-2"
              type="button"
              disabled={lectura}
             onClick={()=>{ 
              UpFermentacion()}}
               
            >
              up
            </button> 
              
              }
                
              </div>
             
            </div>
            
            
            </>
  )
}


