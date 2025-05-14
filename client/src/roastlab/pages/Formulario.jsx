import { useEffect, useRef, useState } from "react";
import "../components/mapa/Mapa.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormProduccion } from "./FormProduccion";
import Swal from "sweetalert2";
import Addusuario from "../helpers/post/Addusuario";
import { UpdateUsuario } from "../helpers/update/UpdateUsuario";
import { GetMunicipios } from "../helpers/get/Get_Municipios";
import { GetCodigoMun } from "../helpers/get";
import { GiSave } from 'react-icons/gi'
import { GrDocumentUpdate } from "react-icons/gr";

export const Formulario = (props) => {
  const [Cedula, setCedula] = useState(props.Cedula || "");
  const [Nombre, setNombre] = useState(props.Nombre || "");
  const [Telefono, setTelefono] = useState(props.Telefono || "");
  const [Email, setEmail] = useState(props.Email || "");
  const [Genero, setGenero] = useState(props.Genero || "");
  const [Municipio, setMunicipio] = useState(props.Municipio || "");
  const [idMunicipio, setidMunicipio] = useState(props.IdMun || "");
  const [listMunicipio, setlistMunicipio] = useState([]);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [CodigoMun, setCodigoMun] = useState("");
  const [MenuProduccion, setMenuProduccion] = useState(false); // cambiar al finalizar de hacer formularios a falso
  const inicioRef = useRef(null);
  useEffect(() => {
    GetMunicipios(setlistMunicipio);
  
  }, [1]);
  const handleButtonClick = () => {
    setTimeout(() => {
      if (inicioRef.current) {
        inicioRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      setEstadolectura(false);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      UpdateUsuario(Cedula, Nombre, Telefono, Email, Genero, idMunicipio);
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (
      Cedula !== "" &&
      Nombre !== "" &&
      Telefono !== "" &&
      Email !== "" &&
      Genero !== "" &&
      Municipio !== ""
    ) {
      Addusuario(
        Cedula,
        Nombre,
        Telefono,
        Email,
        Genero,
        idMunicipio,
        setEstadobutton,
        setEstadolectura,
        setMenuProduccion
      );
      handleButtonClick()
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
      <div className="container p-3">
        <div className="card text-center">
          <div className="card-header">
            Información Sociodemográfica
          </div>
          <div className="row card-body">
            <div className="input-group mb-3">
              <span className="input-group-text col-2 " id="basic-addon1">
                Cédula:{""}
              </span>
              <div className="col-4">
              <input
                type="number"
                min="0"
                id="cedula"
                name="cedula"
                className="form-control"
                onChange={(event) => {
                  if(event.target.value >= 0)
                  setCedula(event.target.value);
                }}
                readOnly={estadolectura}
                value={Cedula || ""}
                placeholder="Ingrese su Cédula"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>
              <span className="input-group-text col-2" id="basic-addon1">
                Teléfono:{""}
              </span>
              <input
                type="number"
                min="0"
                id="Telefono"
                name="Telefono"
                className="form-control"
                onChange={(event) => {
                  if(event.target.value >= 0)
                  setTelefono(event.target.value);
                }}
                readOnly={estadolectura}
                value={Telefono || ""}
                placeholder="Ingrese su Teléfono"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text  col-2" id="basic-addon1">
                Nombre:{""}
              </span>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                className="form-control"
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                readOnly={estadolectura}
                value={Nombre || ""}
                placeholder="Ingrese su Nombre"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text  col-2" id="basic-addon1">
                Email:{""}
              </span>
              <input
                type="email"
                id="Email"
                name="Email"
                autoComplete="Email"
                className="form-control"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                readOnly={estadolectura}
                value={Email || ""}
                placeholder="Ingrese su Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                Género:{""}
              </span>
              {Genero === "" ? (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  id="genero"
                  name="genero"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                >
                  {"Seleccione su Género"}
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  id="genero"
                  name="genero"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                >
                  {Genero}
                </button>
              )}

              <ul className="dropdown-menu">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setGenero("Masculino");
                  }}
                >
                  Masculino
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setGenero("Femenino");
                  }}
                >
                  Femenino
                </li>
              </ul>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                Municipio:{""}
              </span>
              {Municipio === "" ? (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  id="municipio"
                  name="municipio"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                  defaultValue={Municipio || ""}
                >
                  {"Seleccione Municipio"}
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  id="municipio"
                  name="municipio"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  defaultValue={Municipio || ""}
                  disabled={estadolectura}
                >
                  {Municipio}
                </button>
              )}

              <ul className="dropdown-menu ">
                {listMunicipio.map((val) => {
                  return (
                    <li
                      key={val.id}
                      className="dropdown-item"
                      onClick={() => {
                        setMunicipio(val.nombre_mun);
                        setidMunicipio(val.id);
                      }}
                    >
                      {val.nombre_mun}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              {estadobutton === false ? (
                <button
                  className="btn btn-danger me-md-2"
                  type="button"
                  onClick={() => {
                    // GetCodigoMun(parseInt(idMunicipio), setCodigoMun)
                    menuSig();
                  }}
                >
                  <GiSave size={20} />  Guardar  
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
      {MenuProduccion == false ? <div ></div> :<div ref={inicioRef} id="produccion" style={{ height: "500px" }}>
          <FormProduccion Cedula={Cedula} />
        </div>}
    </>
  );
};
export default Formulario;
