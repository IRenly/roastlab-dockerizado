import { useEffect, useState } from "react";
import { MuestraHumeda } from "../components/MuestraHumeda";
import { Muestraseca } from "../components/Muestraseca";
import { FormTueste } from "./FormTueste";
import { GetIdCultivo } from "../helpers/get/Get_Id_Cultivo";
import Swal from "sweetalert2";
import { AddTrilla } from "../helpers/post/AddTrilla";
import { UpdateTrilla } from "../helpers/update/UpdateTrilla";
import { GetIdTrilla } from "../helpers/get/Get_Id_Trilla";
import { GetIdRecibido } from "../helpers/get/Get_Id_Recibido";
import { Get_Muestra_Recibida } from "../helpers/get/get_muestra_recibida";
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormTrilla = (props) => {
  const [Estado_Muestra, setEstado_Muestra] = useState(props.Estado_muestra || "Seca");
  const [menusig, setmenusig] = useState(false);
  const [IdMuestra, setIdMuestra] = useState(props.Id_Muestra);
  const [Idcultivo, setIdcultivo] = useState();
  const [Idtrilla, setIdtrilla] = useState(props.ID);
  const [Info, setInfo] = useState(props.Info);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);

  //variables del form seco
  const [Huemdad, setHuemdad] = useState(props.Humedad);
  const [A_W, setA_W] = useState(props.AW);
  const [Factor, setFactor] = useState(props.Factor);
  const [Densidad, setDensidad] = useState(props.Densidad);
  const [Color, setColor] = useState(props.Color);
  //variables del form humeda
  const [Grados_B, setGrados_B] = useState(props.GradosB);
  const [P_H, setP_H] = useState(props.PH);
  const [Acidez, setAcidez] = useState(props.Acidez);
  const [servicio, setservicio] = useState("trilla");

  useEffect(() => {
    //GetIdRecibido(setIdMuestra)
   // Get_Muestra_Recibida(setEstado_Muestra)
    // GetIdCultivo(setIdcultivo)
    // console.log(Estado_Muestra)
  }, [Estado_Muestra])

  // const idcultivo = (newid, menu) => {
  //   setIdMuestra(newid);
  // };
  // const menu = (newmenu) => {
  //   setmenusig(newmenu);
  // };
  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      if(Idtrilla === undefined){
        GetIdTrilla(setIdtrilla);
      }
      setEstadolectura(false);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      UpdateTrilla(
        Idtrilla,Huemdad,
        A_W,
        Factor,
        Densidad,
        Color,
        Grados_B,
        P_H,
        Acidez,
        Info, 
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (Estado_Muestra === "Seca") {
      if (
        Huemdad != undefined &&
        A_W != undefined &&
        Factor != undefined &&
        Densidad != undefined &&
        Color != undefined
      ) {
        AddTrilla(
          Huemdad,
          A_W,
          Factor,
          Densidad,
          Color,
          Grados_B,
          P_H,
          Acidez,
          Info, IdMuestra,
           setEstadobutton,
           setEstadolectura
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Porfavor llena todos los campos",
        });
      }
    } else {
      if (
        Huemdad != undefined &&
        A_W != undefined &&
        Factor != undefined &&
        Densidad != undefined &&
        Color != undefined &&
        Grados_B != undefined &&
        P_H != undefined &&
        Acidez != undefined
      ) {
        AddTrilla(
          Huemdad,
          A_W,
          Factor,
          Densidad,
          Color,
          Grados_B,
          P_H,
          Acidez,
          Info, IdMuestra,
          setEstadobutton,
          setEstadolectura
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Porfavor llena todos los campos",
        });
      }
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="card text-center">
          <div className="card-header">Trilla</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                ID muestra{" "}
              </span>
              <input
                type="text"
                readOnly
                defaultValue={IdMuestra || ""}
                className="form-control"
                placeholder="Id de la meustra"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text col-2" id="basic-addon1">
                Muestra{" "}
              </span>

              <button
                className="btn btn-outline-secondary dropdown-toggle col-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={true}
              >
                {Estado_Muestra}
              </button>


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
            ) : (
              undefined
            )}
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
                      className="form-control"
                      placeholder="describir..."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      readOnly={estadolectura}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {menusig === true ? <FormTueste /> : <h2></h2>} */}
    </>
  );
};
