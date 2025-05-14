import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FormRecibido } from "./FormRecibido";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetTipoBeneficio, GetIdCultivo, GetIdFermentado, GetIdSecado } from "../helpers/get/";
;
import { AddBeneficio } from "../helpers/post/AddBeneficio";
import { GetIdBeneficio } from "../helpers/get/Get_id_Beneficio";
import { UpdateBeneficio } from "../helpers/update/UpdateBeneficio";


export const FormBeneficio = (props) => {
  const [Idbeneficio, setIdbeneficio] = useState(props.Id_beneficio );
  const [IdMuestra, setIdMuestra] = useState(props.Id_Muestra || "");
  const [Idcultivo, setIdcultivo] = useState(props.Id_Cultivo );
  const [IdFermentado, setIdFermentado] = useState(props.Id_fermentado );
  const [IdSecado, setIdSecado] = useState(props.Id_secado );
  const [Tipo, setTipo] = useState(props.Tipo_beneficio || "");
  const [IdTipo, setIdtTipo] = useState(props.Id_tipo_beneficio || "");
  const [ListaTipo, setlistaTipo] = useState([]);
  const [Nproductor, setNproductor] = useState(props.Nombre || "");
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [MenuRecibido, setMenuRecibido] = useState(false); // cambiar a false
    // traer tipo beneficio
    useEffect(()=>{
    // cedula id-mun(cod-mun)
      GetTipoBeneficio(setlistaTipo)
      if(Idcultivo === undefined && IdFermentado === undefined && IdSecado === undefined){
        
        GetIdCultivo(setIdcultivo)
        GetIdFermentado(setIdFermentado)
        GetIdSecado(setIdSecado)
      }
      // GetCodigoMun(parseInt(idMunicipio), setCodigoMun)
    },[1])
  

    const estados = () => {
      if (estadobutton === false) {
        setEstadobutton(true);
        setEstadolectura(true);
      } else if (estadobutton === true && estadolectura === true) {
        setEstadolectura(false);
        if(Idbeneficio === undefined){

          GetIdBeneficio(setIdbeneficio)
        }
        //console.log(Idbeneficio)
        Swal.fire({
          icon: "info",
          title: "Actualizar",
          text: "Se Habilitaron Los Campos Para Que Puedas Realizar Las Modificaciones",
        });
      } else if (estadobutton === true && estadolectura === false) {
        UpdateBeneficio(Idbeneficio,Idcultivo,
          IdTipo,
          IdFermentado,
          IdSecado)
        setEstadolectura(true);
      }
    };



  const menuSig = () => {
    if (
      Tipo !== "" 
    ) {
      AddBeneficio(Idcultivo,
        IdTipo,
        IdFermentado,
        IdSecado,setMenuRecibido,setEstadobutton,setEstadolectura)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por Favor, asegurate de haber rellenado los campos obligatorios (*)",
      });
    }
  };
  return (
    <>
      <div className="container    p-3">
        <div className="card  text-center">
          <div className="card-header">Beneficio</div>
          <div className="card-body ">
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                ID muestra{" "}
              </span>
              <input
                defaultValue={IdMuestra}
                type="text"
                readOnly
                className="form-control"
                placeholder="Id de la meustra"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text col-2" id="basic-addon1">
                Productor:{" "}
              </span>
              <input
                type="text"
                defaultValue={Nproductor || ""}
                readOnly
                className="form-control"
                placeholder="Productor"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group ">
            
              <span className="input-group-text col-2" id="basic-addon1">
                Tipo:{" "}
              </span>
              {Tipo === "" ? (
                
                  <button
                    className="btn btn-outline-secondary dropdown-toggle col-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    value="selecione tipo"
                    disabled={estadolectura}
                  >
                    seleccione
                  </button>
                
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
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
                  }}
                >
                  {val.nombre}
                </li>
                    )
                  })
                }
                
              </ul>
            </div>
            
          </div>

          {estadobutton === false ? (
                <button
                  className="btn btn-danger me-md-2"
                  type="button"
                  onClick={menuSig}
                >
                  Guardar
                </button>
              ) : (
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={estados}
                >
                  actualizar
                </button>
              )}
             
        </div>
         
      </div>
      {
          MenuRecibido === true ?
          <FormRecibido />:
          <h3></h3>

        }
    </>
  );
};
