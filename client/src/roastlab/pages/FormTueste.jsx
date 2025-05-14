import { useEffect, useState } from "react";
import { Muestraseca } from "../components/Muestraseca";
import { MuestraHumeda } from "../components/MuestraHumeda";
import Swal from "sweetalert2";
import { GetIdRecibido } from "../helpers/get/Get_Id_Recibido";
import { Get_Muestra_Recibida } from "../helpers/get/get_muestra_recibida";
import { AddTueste } from "../helpers/post/AddTueste";
import { GetIdTueste } from "../helpers/get";
import { UpdateTueste } from "../helpers/update/UpdateTueste";
import { GraphCurva } from "../components";
import '../components/Muestras.css'
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormTueste = (props) => {
  const [Estado_Muestra, setEstado_Muestra] = useState(
    props.Estado_muestra || "Seca"
  );
  const [menusig, setmenusig] = useState(false);
  const [IdMuestra, setIdMuestra] = useState(props.Id_Muestra);
  const [IdTueste, setIdTueste] = useState(props.ID);
  const [Info, setInfo] = useState(props.Info);
  const [agdrom, setagdrom] = useState(props.Agdrom);
  const [curvagra, setcurvagra] = useState(props.Curva || []);
  const [Tipo_tueste, setTipo_tueste] = useState(props.TipoTueste);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [pesoInicial, setPesoInicial] = useState()
  const [malla1, setmalla1] = useState();
  const [malla2, setmalla2] = useState();
  const [malla3, setmalla3] = useState();
  const [malla4, setmalla4] = useState();
  const [malla5, setmalla5] = useState();
  const [malla6, setmalla6] = useState();
  const [malla7, setmalla7] = useState();
  const [malla8, setmalla8] = useState();

  //variables del form seco
  const [Huemdad, setHuemdad] = useState(props.Humedad);
  const [A_W, setA_W] = useState(props.AW);
  const [Factor, setFactor] = useState();
  const [Densidad, setDensidad] = useState(props.Densidad);
  const [Color, setColor] = useState(props.Color);
  //variables del form humeda
  const [Grados_B, setGrados_B] = useState(props.GradosB);
  const [P_H, setP_H] = useState(props.PH);
  const [Acidez, setAcidez] = useState(props.Acidez);
  const [servicio, setservicio] = useState("Tueste");
  var objet
  useEffect(() => {
    //GetIdRecibido(setIdMuestra);
    //Get_Muestra_Recibida(setEstado_Muestra);
    // GetIdCultivo(setIdcultivo)
    // console.log(Estado_Muestra)
  }, [Estado_Muestra]);
  useEffect(() => {
    if (curvagra) {
      try {
        objet = JSON.parse(curvagra);
        const valor = objet[0];
        setPesoInicial(valor.pesoInicia);
        setmalla1(valor.malla1);
        setmalla2(valor.malla2);
        setmalla3(valor.malla3);
        setmalla4(valor.malla4);
        setmalla5(valor.malla5);
        setmalla6(valor.malla6);
        setmalla7(valor.malla7);
        setmalla8(valor.malla8);
       // console.log(valor.l);
      } catch (err) {
        console.log("");
      }
    }
  }, []);
  useEffect(() => {
    setcurvagra([
      {
        pesoInicia: pesoInicial,
        malla1: malla1,
        malla2: malla2,
        malla3: malla3,
        malla4: malla4,
        malla5: malla5,
        malla6: malla6,
        malla7: malla7,
        malla8: malla8
      },
    ]);
  }, [malla1, malla2, malla3, malla4, malla5, malla6, malla7, malla8,pesoInicial]);
  useEffect(() => {
    if (agdrom >= 25 && agdrom <= 45) {
      setTipo_tueste("Oscuro");
    } else if (agdrom >= 55 && agdrom <= 65) {
      setTipo_tueste("Medio");
    } else if (agdrom >= 75 && agdrom <= 95) {
      setTipo_tueste("Claro");
    } else {
      setTipo_tueste("valor no valido");
    }
  }, [agdrom]);

  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      if (IdTueste === undefined) {
        GetIdTueste(setIdTueste);
      }
      setEstadolectura(false);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      
      UpdateTueste(
        IdTueste,
        Huemdad,
        A_W,
        Color,
        agdrom,
        Densidad,
        curvagra,
        Tipo_tueste,
        Info,
        Grados_B,
        P_H,
        Acidez,
        IdMuestra
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    const camposFaltantes = [];

    // Campos comunes
    if (!Huemdad) camposFaltantes.push("Humedad");
    if (!A_W) camposFaltantes.push("A_W");
    if (!Factor) camposFaltantes.push("Factor");
    if (!Densidad) camposFaltantes.push("Densidad");
    if (!Color) camposFaltantes.push("Color");

    if (Estado_Muestra === "Seca") {
      // Si hay faltantes, mostrar alerta
      if (camposFaltantes.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          html: `Faltan los siguientes campos obligatorios:<br><ul>${camposFaltantes.map(c => `<li>${c}</li>`).join('')}</ul>`,
        });
      } else {
        AddTueste(
          Huemdad,
          A_W,
          Color,
          agdrom,
          Densidad,
          curvagra,
          Tipo_tueste,
          Info,
          Grados_B,
          P_H,
          Acidez,
          IdMuestra,
          setEstadobutton,
          setEstadolectura
        );
      }
    } else {
      // Para muestra húmeda, también validar agdrom y tipo tueste
      if (!agdrom) camposFaltantes.push("Agtrom");
      if (Tipo_tueste === "valor no valido") camposFaltantes.push("Tipo de tueste válido");

      if (camposFaltantes.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          html: `Faltan los siguientes campos obligatorios:<br><ul>${camposFaltantes.map(c => `<li>${c}</li>`).join('')}</ul>`,
        });
      } else {
        AddTueste(
          Huemdad,
          A_W,
          Color,
          agdrom,
          Densidad,
          curvagra,
          Tipo_tueste,
          Info,
          Grados_B,
          P_H,
          Acidez,
          IdMuestra,
          setEstadobutton,
          setEstadolectura
        );
      }
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="card text-center">
          <div className="card-header">Tueste</div>
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
                  Húmeda
                </li>
              </ul>
            </div>
            <div className="card-body">
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

              <div className="input-group mb-3">
                <span className="input-group-text col-2" id="basic-addon1">
                  *Agtrom:{" "}
                </span>
                <input
                  type="number"
                  min="0"
                  value={agdrom || ""}
                  onChange={(event) => {
                    setagdrom(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Agtrom"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text col-2" id="basic-addon1">
                  Tipo tueste:{" "}
                </span>
                <input
                  type="text"
                  defaultValue={Tipo_tueste}
                  className="form-control"
                  placeholder="tueste"
                  aria-label="Username"
                  readOnly
                  aria-describedby="basic-addon1"
                />
              </div>

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
              <hr />
              <div className="mb-3">
                Curva Granulometrica
              </div>
              <div className="input-group" style={{justifyContent:'center'}}>
                  <span className="input-group-text mb-3 col-2">Peso Inicial {"(gramos)"}</span>
                  <div className="col-2">
                  <input
                        type="number"
                        min="0"
                        value={pesoInicial || ""}
                        onChange={(event) => {
                          setPesoInicial(event.target.value);
                        }}
                        className="form-control"
                        readOnly={estadolectura}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                  </div>
                </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 425 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla1 || ""}
                    onChange={(event) => {
                      setmalla1(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    readOnly={estadolectura}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 355 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla2 || ""}
                    onChange={(event) => {
                      setmalla2(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    readOnly={estadolectura}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 300 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla3 || ""}
                    onChange={(event) => {
                      setmalla3(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    readOnly={estadolectura}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 212 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla4 || ""}
                    onChange={(event) => {
                      setmalla4(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    aria-label="Username"
                    readOnly={estadolectura}
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 180 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla5 || ""}
                    onChange={(event) => {
                      setmalla5(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    readOnly={estadolectura}
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 150 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla6 || ""}
                    onChange={(event) => {
                      setmalla6(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    readOnly={estadolectura}
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 125 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla7 || ""}
                    onChange={(event) => {
                      setmalla7(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    aria-label="Username"
                    readOnly={estadolectura}
                    aria-describedby="basic-addon1"
                  />
                  <span className="input-group-text col-2" id="basic-addon1">
                    Malla 106 {"( µm )"} :
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={malla8 || ""}
                    onChange={(event) => {
                      setmalla8(event.target.value);
                    }}
                    className="form-control"
                    placeholder="Peso"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    readOnly={estadolectura}
                  />
                </div>
              </div>
              <div className="chart-container curva">
              <GraphCurva Lista={["0","Malla 425","Malla 355","Malla 300","Malla 212","Malla 180","Malla 150","Malla 125","Malla 106"]}
              CurvaGra={[0, ((malla1/pesoInicial)*100),((malla2/pesoInicial)*100),((malla3/pesoInicial)*100),((malla4/pesoInicial)*100),((malla5/pesoInicial)*100),((malla6/pesoInicial)*100),((malla7/pesoInicial)*100),((malla8/pesoInicial)*100)]}/>
              </div>
              <div className="container p-3">
                <div className="card text-center">
                  <div className="card-header">Información Adicional</div>
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text col-2"
                        id="basic-addon1"
                      >
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
      </div>
      {/* {menusig === true ? <FormTueste /> : <h2></h2>} */}
    </>
  );
};
