import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FormSecado } from "./FormSecado";
import Swal from "sweetalert2";
import { Fermentacion } from "../components/fermentacion";
import { App } from "../helpers/FuncionFermen";
import { AddFermentacion } from "../helpers/post/AddFermentacion";
import { GetIdFermentado } from "../helpers/get/Get_Id_Fermentado";
import { UpdateFermentado } from "../helpers/update/UpdateFermentado";
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormFermentacion = (props) => {
  const [fermentacion, setFermentacion] = useState([]);
  
  const [Temperatura, setTemperatura] = useState(props.Temperatura);
  const [Id, setId] = useState(props.Id_fermentado);
  const [Tipo, setTipo] = useState();
  const [pH, setpH] = useState(props.PH);
  const [GradosBrix, setGradosBrix] = useState(props.GradosB);
  const [MicroOrganismos, setMicroOrganismos] = useState(props.Microorganismos);
  const [InfoMicroOrganismos, setInfoMicroOrganismos] = useState(props.info_micro);
  const [culturin, setculturin] = useState(props.Culturing);
  const [Infoculturin, setInfoculturin] = useState(props.info_culturing);
  const [Tiempo, setTiempo] = useState();
  const [Repe, setRepe] = useState(1);
  const [menusig, setmenusig] = useState(false);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [listabusqueda, setlistabusqueda] = useState(props.Fermentacion);
  const [cultivo, setcultivo] = useState(props.cultivo);
  const [search, setsearch] = useState(props.search || false);
  const inicioRef = useRef(null)
  useEffect(()=>{
    if(search === true){
      setmenusig(false)
    }
  },[menusig])
  //const objeto = JSON.parse(listabusqueda)
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
  
const scroll = ()=>{
  setTimeout(()=>{

    if (inicioRef.current){
      inicioRef.current.scrollIntoView({behavior: 'smooth'})
    }
  },100)
}
  
  useEffect(() => {
    AgregarFermentacion();
  }, [Tipo]);
  useEffect(()=>{
    if(tamano >= 1){

      setRepe(tamano)
      
    }
  },[1])

  const AgregarFermentacion = () => {
    if(Tipo!==undefined ){
      setFermentacion((prev) => {
        return [...prev, { tipo: Tipo, tiempo: Tiempo }];
      });
     // console.log(fermentacion);
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
        <Fermentacion key={i} num={i} tiem={tiempo} Tiempo={setTiempo} tip={tipo} Tipo={setTipo} setFermentacion={setFermentacion} estadolectura={estadolectura}  />
      );
    }

    return component;
  };
  const estados = () => {
      if (estadobutton === true && estadolectura === true) {
      setEstadolectura(false);
      if(Id === undefined){
        GetIdFermentado(setId)
        
      }
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      UpdateFermentado(
        Temperatura,
        fermentacion,
        pH,
        GradosBrix,
        MicroOrganismos,
        culturin,InfoMicroOrganismos,Infoculturin,
        cultivo,
        Id,
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (
      // Temperatura !== undefined &&
      fermentacion !== undefined &&
      // pH !== undefined &&
      // GradosBrix !== undefined &&
      MicroOrganismos !== undefined &&
      culturin !== undefined 
    ) {

      AddFermentacion(
        Temperatura,
        fermentacion,
        pH,
        GradosBrix,
        MicroOrganismos,
        culturin,
        InfoMicroOrganismos,
        Infoculturin,
        cultivo,
        setmenusig,
        setEstadobutton,
        setEstadolectura
      );
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
          <div className="card-header">Fermentación</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text col-2  " id="basic-addon1">
                Temperatura ( °C ):{" "}
              </span>
              <input
                type="number"
                value={Temperatura || ""}
                onChange={(event) => {
                  setTemperatura(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Temperatura (N/A = 0)"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            {renderRepe()}
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
            <div className="input-group mt-3 mb-3">
              <span className="input-group-text col-2  " id="basic-addon1">
                pH:{" "}
              </span>
              <input
                type="number"
                value={pH || ""}
                onChange={(event) => {
                  setpH(event.target.value);
                }}
                required
                readOnly={estadolectura}
                className="form-control"
                placeholder="pH (N/A = 0)"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text col-2  " id="basic-addon1">
                °Brix:{" "}
              </span>
              <input
                type="number"
                value={GradosBrix || ""}
                onChange={(event) => {
                  setGradosBrix(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Grados Brix (N/A = 0)"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group ">
              <span className="input-group-text mb-1 col-2" id="basic-addon">
                *Microorganismos{" "}
              </span>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault1"
                  onClick={() => {
                    setMicroOrganismos(1);
                  }}
                  disabled={estadolectura}
                  defaultChecked={ MicroOrganismos === 1}
                />
                <label className="form-check-label" form="flexRadioDefault1">
                  Si
                </label>
              </div>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="flexRadioDefault1"
                  onClick={() => {
                    setMicroOrganismos(0);
                    setInfoMicroOrganismos("")
                  }}
                  disabled={estadolectura}
                  defaultChecked={ MicroOrganismos === 0}
                />
                <label className="form-check-label" form="flexRadioDefault2">
                  No
                </label>
              </div>
              {
                MicroOrganismos === 1? <>
                  <div className="col-4 p-2">
                  <input
                type="text"
                value={InfoMicroOrganismos || ""}
                onChange={(event) => {
                  setInfoMicroOrganismos(event.target.value);
                }}
                readOnly={estadolectura}
                className=" form-control"
                placeholder="Qué microorganimos usó?"
                aria-label="Username"
                 />
                  </div>
                 
                </>: undefined
              }
            </div>
            <div className="input-group ">
              <span className="input-group-text mb-1 col-2" id="basic-addon">
                *Culturing:{" "}
              </span>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioCulturing1"
                  id="flexRadioCulturing1"
                  onClick={() => {
                    setculturin(1);
                  }}
                  disabled={estadolectura}
                  defaultChecked={ culturin === 1}

                />
                <label className="form-check-label" form="flexRadioDefault1">
                  Si
                </label>
              </div>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioCulturing1"
                  id="flexRadioCulturing1"
                  onClick={() => {
                    setculturin(0);
                    setInfoculturin("")
                  }}
                  disabled={estadolectura}
                  defaultChecked={ culturin === 0}
                />
                <label className="form-check-label" form="flexRadioDefault2">
                  No
                </label>
              </div>
              {
                culturin === 1? <>
                <div className="col-4 p-2">
                <input
                type="text"
                value={Infoculturin || ""}
                onChange={(event) => {
                  setInfoculturin(event.target.value);
                }}
                readOnly={estadolectura}
                className=" form-control"
                placeholder="Qué culturing usó?"
                aria-label="Username"
                 />
                </div>

                </>: undefined
              }
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
      {menusig === true ? <div ref={inicioRef} style={{height:'500px'}}><FormSecado cultivo={cultivo}  /> </div> : <h2></h2>}
    </>
  );
};
