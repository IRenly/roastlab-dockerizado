import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FormFermentacion } from "./FormFermentacion";
import { GetVariedad } from "../helpers/get/GetVariedad";
import { GetIdPro } from "../helpers/get/Get_Id_Pro";
import { AddCultivo } from "../helpers/post/AddCultivo";
import { UpdateCultivo } from "../helpers/update/UpdateCultivo";
import { GetIdCultivo } from "../helpers/get/Get_Id_Cultivo";
import "./cultivo.css";
import { FormBeneficio } from "./FormBeneficio";
import { ComprobarCC } from "../helpers/post/ComprobarCC";
import { ListaProduccion } from "../helpers/post/Listaproduccion";
import { GetTipoBeneficio } from "../helpers/get";
import { Get_codigo } from "../helpers/get/Get_Codigo";
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormCultivo = (props) => {
  const [id, setId] = useState(props.Id);
  const [Variedad, setVariedad] = useState(props.Variedad || "");
  const [idVariedad, setidVariedad] = useState(props.Idvariedad || "");
  const [ListVariedad, setListVariedad] = useState([]);
  const [ListaP, setListaP] = useState([]);
  const [Edad_Cul, setEdad_Cul] = useState(props.Edad_Cul || "");
  const [Altura_SNM, setAltura_SNM] = useState(props.Altura_SNM || "");
  const [Fertilizacion, setFertilizacion] = useState(props.Fertilizacion);
  const [Organico, setOrganico] = useState(props.Organico);
  const [idProducion, setIdProducion] = useState();
  const [Ccper, setCcper] = useState(props.Cedula);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [ListaTipo, setlistaTipo] = useState([]);
  const [Tipo, setTipo] = useState(props.Tipo || "");
  const [IdTipo, setIdtTipo] = useState(props.Idtipo || "");
  const [Hectareas, setHectareas] = useState(props.Hectareas || "");
  const [Estado_Muestra, setEstado_Muestra] = useState(
    props.Estado_muestra || "Seca"
  );
  const [codigob, setcodigob] =useState()
  const [codigoV, setcodigoV] =useState()
  const [Contador, setContador] =useState(0)
  const inicioRef = useRef(null)



  const [menusig, setmenusig] = useState(false); // cambiar a false
  useEffect(() => {
    GetTipoBeneficio(setlistaTipo)
    if (Ccper !== undefined) {
      GetIdPro(Ccper, setIdProducion);
    } else {
      comprobarcedula();
    }
    GetVariedad(setListVariedad);
  }, [1]);
   

  const validarcc = (valor) => {
    ComprobarCC(valor).then((response) => {
      if (response === true) {
        Swal.fire({
          icon: "success",
          title: ` cedula: ${valor} encontrada`,
          text: `ya puedes guardar un Nuevo Cultivo`,
          timer: 2000,
          showConfirmButton: false,
        });
        setCcper(valor);
        ListaProduccion(valor, setListaP);
      } else {
        condicion();
      }
    });
  };
  const condicion = () => {
    if (Ccper === undefined) {
      Swal.fire({
        title: "la cedula no se encuentra en la base de datos",
        icon: "error",
        showCancelButton: true,
        cancelButtonColor: "Minimal",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Reintentar",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if (inputValue) {
            comprobarcedula();
          }
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          window.history.back();
        }
      });
    }
  };
  const comprobarcedula = () => {
    Swal.fire({
      title: "Ingrese Cedula",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (inputValue) {
          validarcc(inputValue);
        }
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.history.back();
      }
    });
  };
  const scroll = ()=>{
    setTimeout(()=>{

      if (inicioRef.current){
        inicioRef.current.scrollIntoView({behavior: 'smooth'})
      }
    },100)
  }

  useEffect(()=>{
    if(estadolectura === false){

      Get_codigo(Ccper,setId, codigoV, codigob, setContador, Contador )
    }
  },[codigoV,codigob, Contador])

  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      setEstadolectura(false);
      if(id === undefined){
        GetIdCultivo(setId);
      }

      //console.log(id);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      console.log(id)
      UpdateCultivo(
        id,
        idVariedad,
        Edad_Cul,
        Altura_SNM,
        Fertilizacion,
        Organico,
        IdTipo,
        Estado_Muestra,
        Hectareas,
        idProducion
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (
      Variedad !== "" &&
      Edad_Cul !== "" &&
      Altura_SNM !== "" &&
      Fertilizacion !== undefined &&
      Organico !== undefined&&
      Hectareas !== ""
    ) {
      
      AddCultivo(
        id,
        idVariedad,
        Edad_Cul,
        idProducion,
        Altura_SNM,
        Fertilizacion,
        Organico,
        IdTipo,
        Estado_Muestra,
        Hectareas,
        setmenusig,
        setEstadobutton,
        setEstadolectura
      );
      scroll()
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por Favor, asegurate de haber rellenado todos los campos.",
      });
    }
  };

  return (
    <>
      <div className="container p-3 ">
        <div className="card text-center">
          <div className="card-header">Cultivo</div>
          <div className="card-body">
            {ListaP.length === 0 ? undefined : (
              <>
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  defaultValue={idProducion || ""}
                  disabled={estadolectura}
                >
                  {idProducion}
                </button>
                <ul className="dropdown-menu ">
                  {ListaP.map((val) => {
                    return (
                      <li
                        key={val.id}
                        className="dropdown-item"
                        onClick={() => {
                          setIdProducion(val.id);
                        }}
                      >
                        {val.id}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text  col-2 " id="basic-addon1">
                Variedad:{""}
              </span>
              {Variedad === "" ? (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadobutton}
                  defaultValue={Variedad || ""}
                >
                  {"Seleccione Variedad"}
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  defaultValue={Variedad || ""}
                  disabled={estadobutton}
                >
                  {Variedad}
                </button>
              )}
              <ul className="dropdown-menu ">
                {ListVariedad.map((val) => {
                  return (
                    <li
                      key={val.id}
                      className="dropdown-item"
                      onClick={() => {
                        setVariedad(val.nombre_variedad);
                        setidVariedad(val.id);
                        setcodigoV(val.codigo_var)
                      }}
                    >
                      {val.nombre_variedad}
                    </li>
                  );
                })}
              </ul>
              <span className="input-group-text col-2  " id="basic-addon1">
                Edad del Cultivo ( Años ):{" "}
              </span>
              <div className="col-2">
              <input
                type="text"
                value={Edad_Cul || ""}
                onChange={(event) => {
                  setEdad_Cul(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Edad del cultivo"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-3" id="basic-addon1">
                Hectáreas Producidas:{" (kg/ha) "}
              </span>
              <div className="col-4">
              <input
                type="number"
                value={Hectareas || ""}
                readOnly={estadolectura}
                onChange={(event)=>{
                    setHectareas(event.target.value)
                }}
                className="form-control"
                placeholder="kg/ha"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>
              <span className="input-group-text col-2" id="basic-addon1">
                Altura S.N.M: (Metros) {" "}
              </span>
              <input
                type="number"
                value={Altura_SNM || ""}
                onChange={(event) => {
                  setAltura_SNM(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Altura sobre el nivel del mar"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group ">
              <span className="input-group-text mb-1 col-2" id="basic-addon1">
                Fertilización{" "}
              </span>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onClick={() => {
                    setFertilizacion(1);
                  }}
                  disabled={estadolectura}
                  defaultChecked={Fertilizacion === 1}
                />
                <label className="form-check-label" form="flexRadioDefault1">
                  Si
                </label>
              </div>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  onClick={() => {
                    setFertilizacion(0);
                  }}
                  disabled={estadolectura}
                  defaultChecked={Fertilizacion === 0}
                />
                <label className="form-check-label" form="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="input-group ">
              <span className="input-group-text mb-1 col-2" id="basic-addon">
                Orgánico{" "}
              </span>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioOrganico1"
                  id="flexRadioOrganico1"
                  onClick={() => {
                    setOrganico(1);
                  }}
                  disabled={estadolectura}
                  defaultChecked={Organico === 1}
                />
                <label className="form-check-label" form="flexRadioDefault1">
                  Si
                </label>
              </div>
              <div className="form-check  m-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioOrganico1"
                  id="flexRadioOrganico1"
                  onClick={() => {
                    setOrganico(0);
                  }}
                  disabled={estadolectura}
                  defaultChecked={Organico === 0}
                />
                <label className="form-check-label" form="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <hr />
          <div className="mb-3">Beneficio</div>
            <div className="input-group ">
              <span className="input-group-text col-2" id="basic-addon1">
                Tipo de Beneficio:{" "}
              </span>
              {Tipo === "" ? (
                
                  <button
                    className="btn btn-outline-secondary dropdown-toggle col-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    value="selecione tipo"
                    disabled={estadobutton}
                  >
                    Seleccione un tipo
                  </button>
                
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadobutton}
                >
                  {Tipo}
                </button>
              )}

              <ul className="dropdown-menu">
                {
                  ListaTipo.map((val)=>{
                    return(
                      <li key={val.id}
                  className="dropdown-item"
                  onClick={() => {
                    setTipo(val.nombre);
                    setIdtTipo(val.id)
                    setcodigob(val.codigo)
                  }}
                >
                  {val.nombre}
                </li>
                    )
                  })
                }
                
              </ul>
              <span className="input-group-text col-2 ms-1" id="basic-addon1">
                Muestra{" "}
              </span>
              {
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadobutton}
                >
                  {Estado_Muestra}
                </button>
              }

              <ul className="dropdown-menu">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setEstado_Muestra("Seca");
                  }}
                >
                  Seca
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setEstado_Muestra("Humeda");
                  }}
                >
                  Humeda
                </li>
              </ul>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              {estadobutton === false ? (
                <button
                  className="btn btn-danger me-md-2"
                  type="button"
                  onClick={()=>{
                    //codigoEstructurado()
                    
                      menuSig()
        
                  }}
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
      {menusig === true ? <div ref={inicioRef} style={{height: '500px'}}><FormFermentacion cultivo={id} /></div> : <h2></h2>}
    </>
  );
};
