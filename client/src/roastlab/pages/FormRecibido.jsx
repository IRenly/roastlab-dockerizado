import { useEffect, useState } from "react";
import { MuestraHumeda } from "../components/MuestraHumeda";
import { Muestraseca } from "../components/Muestraseca";
import { FormTrilla } from "./FormTrilla";
import Swal from "sweetalert2";
import { AddRecibido } from "../helpers/post/AddRecibido";
import { GetIdBeneficio } from "../helpers/get/Get_id_Beneficio";
import { GetIdRecibido } from "../helpers/get/Get_Id_Recibido";
import { UpdateRecibido } from "../helpers/update/UpdateRecibido";
import { NavLink, Navigate } from "react-router-dom";
import { Get_codigo } from "../helpers/get/Get_Codigo";
import { Get_Muestra_Recibida } from "../helpers/get/get_muestra_recibida";
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormRecibido = (props) => {
  const [Estado_Muestra, setEstado_Muestra] = useState(props.Estado_muestra || "Seca");
  const [FechaRecep, setFechaRecep] = useState(props.Fecha);
  const [Info, setInfo] = useState(props.Info);
  // const [Idbeneficio, setIdbeneficio] = useState(props.Id_beneficio);
  // const [CodigoMun, setCodigoMun] = useState("");
  // const [CodigoVar, setCodigoVar] = useState("");
  // const [CodigoBen, setCodigoBen] = useState("");
  // const [Contador, setContador] = useState(0);
  const [menusig, setmenusig] = useState(true);
  const [servicio, setservicio] = useState("recibido");
  //variables del formseco
  const [Huemdad, setHuemdad] = useState(props.Humedad);
  const [A_W, setA_W] = useState(props.Aw);
  const [Factor, setFactor] = useState(props.Factor_Muestra);
  const [Densidad, setDensidad] = useState(props.Dencidad);
  const [Color, setColor] = useState(props.Color );

  //variables del formHumeda
  const [Grados_B, setGrados_B] = useState(props.GradosB);
  const [P_H, setP_H] = useState(props.pH);
  const [Acidez, setAcidez] = useState(props.Acidez);

  const [IdMuestra, setIdMuestra] = useState(props.Id_Muestra);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [desdebuscar, setdesdebuscar] = useState(props.desdebuscar || false);
  const [Id, setId] = useState(props.ID);

    useEffect(()=>{
      Get_Muestra_Recibida( setEstado_Muestra,IdMuestra)
    },[1])
 

  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      if (Id === undefined) {
        GetIdRecibido(setId);
      }
      setEstadolectura(false);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      
      UpdateRecibido(
        Id,
        FechaRecep,
        Huemdad,
        A_W,
        Factor,
        Densidad,
        Color,
        Grados_B,
        P_H,
        Acidez,
        Info,
        IdMuestra
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (Estado_Muestra === "Seca") {
      if (
        FechaRecep != undefined &&
        Huemdad != undefined &&
        A_W != undefined &&
        Densidad != undefined &&
        Color != undefined
      ) {
        AddRecibido(
          FechaRecep,
          Huemdad,
          A_W,
          Factor,
          Densidad,
          Color,
          Grados_B,
          P_H,
          Acidez,
          Info,
          IdMuestra,
          setmenusig,
          setEstadobutton,
          setEstadolectura
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por Favor, asegurate de haber rellenado todos los campos obligatorios (*)",
        });
      }
    } else {
      if (
        IdMuestra != undefined &&
        FechaRecep != undefined &&
        Huemdad != undefined &&
        A_W != undefined &&
        Factor != undefined &&
        Densidad != undefined &&
        Color != undefined &&
        Grados_B != undefined &&
        P_H != undefined &&
        Acidez != undefined
      ) {
        AddRecibido(
          FechaRecep,
          Huemdad,
          A_W,
          Factor,
          Densidad,
          Color,
          Grados_B,
          P_H,
          Acidez,
          Info,
          IdMuestra,
          setmenusig,
          setEstadobutton,
          setEstadolectura
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por Favor, asegurate de haber rellenado todos los campos obligatorios (*)",
        });
      }
    }
  };
  return (
    <>
      <div className="container p-3">
        <div className="card text-center">
          <div className="card-header">Caracterización Fisicoquímica al terminar el Secado</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                ID muestra{" "}
              </span>
              <input
                type="text"
                defaultValue={IdMuestra || ""}
                className="form-control"
                placeholder="Id de la meustra"
                aria-label="Username"
                aria-describedby="basic-addon1"
                readOnly
              />
              <span className="input-group-text col-2" id="basic-addon1">
                Muestra{" "}
              </span>
              {
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled
                >
                  {Estado_Muestra}
                </button>
              }

              {/* <ul className="dropdown-menu">
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
              </ul> */}
            </div>
            <div className="input-group ">
              <span className="input-group-text col-2" id="basic-addon1">
                *Fecha Recepción:{" "}
              </span>
              <input
                type="date"
                value={FechaRecep || ""}
                onChange={(event) => {
                  setFechaRecep(event.target.value);
                }}
                className="form-control col-2"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <Muestraseca
            setHumedad={setHuemdad}
            setA_W={setA_W}
            setFactor={setFactor}
            setDensidad={setDensidad}
            setColor={setColor}
            humedad={Huemdad}
            aw={A_W}
            factor={Factor}
            dencidad={Densidad}
            color={Color}
            Estadolectura={estadolectura}
            servicio={servicio}
          />
          {Estado_Muestra === "Humeda" ? (
            <MuestraHumeda
              setGrados_B={setGrados_B}
              setP_H={setP_H}
              setAcidez={setAcidez}
              gradosb={Grados_B}
              ph={P_H}
              acidez={Acidez}
            Estadolectura={estadolectura}
            />
          ) : undefined}
          <div className="container p-3">
            <div className="card text-center">
              <div className="card-header">Información Adicional</div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text col-2" id="basic-addon1">
                    Describa:{" "}
                  </span>
                  <input
                    type="text"
                    value={Info || ""}
                    onChange={(event) => {
                      setInfo(event.target.value);
                    }}
                    readOnly={estadolectura}
                    className="form-control"
                    placeholder="describir..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
            {estadobutton === false ? (
              <button
                className="btn btn-danger me-md-2"
                type="button"
                onClick={menuSig}
              >
               <GiSave size={20} /> Guardar
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={estados}
                >
                 <GrDocumentUpdate size={20} /> Actualizar
                </button>
                {desdebuscar=== false? <NavLink className="btn btn-danger me-md-2" to="/agregar">
                  Terminar
                </NavLink>: undefined}
                
              </>
            )}
          </div>
        </div>
      </div>
      {/*<FormTrilla/>*/}
    </>
  );
};
