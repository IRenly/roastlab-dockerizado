import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import { FormBeneficio } from "./FormBeneficio"
import { FormRecibido } from "./FormRecibido"
import { FormTrilla } from "./FormTrilla"
import { GetCombustible } from "../helpers/get/Get_Combustible"
import { GetSilo } from "../helpers/get/Get_Silo"
import { AddSecado } from "../helpers/post/AddSecado"
import { GetIdSecado } from "../helpers/get/Get_Id_Secado"
import { UpdateSecado } from "../helpers/update/UpdateSecado"
import { Fermentacion } from "../components/fermentacion"
import { GiSave } from "react-icons/gi"
import { GrDocumentUpdate } from "react-icons/gr"

export const FormSecado = (props) => {
    const [Idsecado,setIdsecado] = useState(props.Id_secado)
    const [secado,setsecado] = useState([])
    const [Temp_secado,setTemp_secado] = useState(props.Temp_secado)
    const [Humeda_relativa,setHumeda_relativa] = useState(props.Humedad_rela)
    const [Temp_hambiente,setTemp_hambiente] = useState(props.Temperatura)
    const [Tipo_secado,setTipo_secado] = useState()
    const [Tiempo, setTiempo] = useState();
    const [Tipo_silo,setTipo_silo] = useState(props.Tipo_silo)
    const [Idsilo,setIdsilo] = useState(props.Id_silo)
    const [Listasilo,setListasilo] = useState([])
    const [Tipo_combus,setTipo_combus] = useState(props.Tipo_combustible)
    const [Id_combus,setId_combus] = useState(props.Id_combustible)
    const [listcombus,setlist_combus] = useState([])
    const [Secado_continuo,setSecado_continuo] = useState(props.Secado_continuo)
    const [Repe, setRepe] = useState(1);
    const [estadobutton, setEstadobutton] = useState(props.estados || false);
    const [estadolectura, setEstadolectura] = useState(props.estados || false);
    const [menusig,setmenusig] = useState(false)
    const [listabusqueda, setlistabusqueda] = useState(props.Tipo_secado);
    const [cultivo, setcultivo] = useState(props.cultivo);
    const [search, setsearch] = useState(props.search || false);
    const inicioRef = useRef(null)
    const scroll = ()=>{
      setTimeout(()=>{
  
        if (inicioRef.current){
          inicioRef.current.scrollIntoView({behavior: 'smooth'})
        }
      },100)
    }
    useEffect(()=>{
      if(search === true){
        setmenusig(false)
      }
    },[menusig])


    let objeto = {};
    var tamano 
 if (listabusqueda) {
   try {
     objeto = JSON.parse(listabusqueda);
     
   } catch (error) {
     console.error('Error al analizar el JSON:');
   }
 }
 tamano = Object.keys(objeto).length

    useEffect(()=>{
        GetCombustible(setlist_combus)
        GetSilo(setListasilo)

    },[])
    useEffect(() => {
      Agregarsecado();
    }, [Tipo_secado]);
    useEffect(()=>{
      if(tamano >= 1){
  
        setRepe(tamano)
        
      }
    },[1])
  
    const Agregarsecado = () => {
      if(Tipo_secado!==undefined ){
        setsecado((prev) => {
          return [...prev, { tipo: Tipo_secado, tiempo: Tiempo }];
        });
       // console.log(secado);
      }
    };
    const handleClick = () => {
      setRepe(Repe + 1);
     
    };
    const renderRepe = () => {
      const component = [];
      var tipo = undefined
      var tiempo = undefined
      for (let i = 0; i < Repe; i++) {
        
              if(i<tamano && tamano !== 0 ){
                 const valor = objeto[i]
                tipo = valor.tipo
                tiempo = valor.tiempo
                //console.log(tipo)
              }
        component.push(
          <Fermentacion key={i} num={i} tiem={tiempo} Tiempo={setTiempo} tip={tipo} Tipo={setTipo_secado} setFermentacion={setsecado} estadolectura={estadolectura} lista={"secado"}  />
        );
      }
      return component;
    };
    const estados = () => {
      if (estadobutton === false) {
        setEstadobutton(true);
        setEstadolectura(true);
      } else if (estadobutton === true && estadolectura === true) {
        setEstadolectura(false);
        if(Idsecado === undefined){
          GetIdSecado(setIdsecado)
        }
        Swal.fire({
          icon: "info",
          title: "Actualizar",
          text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
        });
      } else if (estadobutton === true && estadolectura === false) {
       UpdateSecado(Idsecado,Temp_secado, Humeda_relativa,
        Temp_hambiente,
        secado,
        Id_combus,
        Idsilo,
        Secado_continuo)
        setEstadolectura(true);
      }
    };
    
    const menuSig = () => {
      if (
        secado !== undefined &&
        Tipo_combus!== undefined &&
        Tipo_silo!== undefined&&
        Secado_continuo!== undefined
      ) {
       
         AddSecado(Temp_secado,
          Humeda_relativa,
          Temp_hambiente,
          secado,
          Id_combus,
          Idsilo,
          Secado_continuo, cultivo, setmenusig, setEstadobutton, setEstadolectura)
          scroll()
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por Favor, asegurate de haber rellenado todos los campos obligatorios (*)",
        });
      }
    };
  return (
    <>
    <div className="container p-3 ">
        <div className="card text-center">
          <div className="card-header">Secado</div>
          <div className="card-body">
          <div className="input-group mb-3">
              <span className="input-group-text col-3  " id="basic-addon1">
                Temperatura de Secado ( °C ) :{" "}
              </span>
              <input
                type="text"
                value={Temp_secado || ""}
                onChange={(event) => {
                  setTemp_secado(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Temperatura de secado"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            {renderRepe()}
            {
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={() => {
                    handleClick();
                  }}
                  disabled={estadolectura}
                >
                  +
                </button>
             </div>
            }
            <div className="input-group mb-3 mt-2">
              <span className="input-group-text col-2  " id="basic-addon1">
                Humedad Ambiente %:{" "}
              </span>
              <input
                type="text"
                value={Humeda_relativa || ""}
                onChange={(event) => {
                  setHumeda_relativa(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Humedad relativa"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text col-3  " id="basic-addon1">
                Temperatura Ambiente ( °C ) :{" "}
              </span>
              <input
                type="text"
                value={Temp_hambiente || ""}
                onChange={(event) => {
                  setTemp_hambiente(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Temperatura ambiente"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-3  " id="basic-addon1">
                *Tipo de Combustible:{" "}
              </span>
              {Tipo_combus === undefined ? (
                  <button
                    className="btn btn-outline-secondary dropdown-toggle col-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={estadolectura}
                    defaultValue={Tipo_combus || ""}
                  >
                    { "Seleccione Combustible"}
                  </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                  defaultValue={Tipo_combus || ""} 
                >
                  {Tipo_combus}
                </button>
              )}
                <ul  className="dropdown-menu">
                  {
                  listcombus.map((val) => {
                return(
                <li key={val.id}
                  className="dropdown-item"
                  onClick={() => {
                    setTipo_combus(val.nombre);
                    setId_combus(val.id)
                  }}
                >
                  {val.nombre}
                </li>
                )})}
              </ul>
              <span className="input-group-text col-3  " id="basic-addon1">
                *Tipo de Silo:{" "}
              </span>
              {Tipo_silo === undefined ? (
                
                  <button
                    className="btn btn-outline-secondary dropdown-toggle col-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={estadolectura}
                    defaultValue={Tipo_silo || ""}
                  >
                    { "Seleccione silo"}
                  </button>
               
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                  defaultValue={Tipo_silo || ""}
                  
                >
                  {Tipo_silo}
                </button>
              )}
              
               
                <ul  className="dropdown-menu">
                  {
                  Listasilo.map((val) => {
                return(
                <li key={val.id}
                  className="dropdown-item"
                  onClick={() => {
                    setTipo_silo(val.nombre);
                    setIdsilo(val.id)
                  }}
                >
                  {val.nombre}
                </li>
                )})}
              </ul>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-2  " id="basic-addon1">
                *Secado Continuo:{" "}
              </span>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault2"
                  onClick={() => {
                    setSecado_continuo(1);
                  }}
                  disabled={estadolectura}
                  defaultChecked={ Secado_continuo === 1}

                />
                <label className="form-check-label" form="flexRadioDefault1">
                  Si
                </label>
              </div>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault2"
                  onClick={() => {
                    setSecado_continuo(0);
                  }}
                  disabled={estadolectura}
                  defaultChecked={ Secado_continuo === 0}
                />
                <label className="form-check-label" form="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {estadobutton === false ? (
                <button
                  className="btn btn-danger me-md-2"
                  type="button"
                  onClick={menuSig}
                >
                 <GiSave size={20} /> Guardar
                </button>
              ) : (
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={estados}
                >
                  <GrDocumentUpdate size={20} /> Actualizar
                </button>
              )}
            </div>
          </div>
          
        </div>
       
    </div>
    { menusig === true ? <div ref={inicioRef} style={{height:'500px'}}> <FormRecibido Id_Muestra={cultivo} /> </div> : <h2></h2>}
    </>
  )
}
