import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MuestraHumeda } from "./MuestraHumeda";
import { GraphFactor } from "./graficas/GraphFactor";
import './Muestras.css'

export const Muestraseca = ({
  prueba,
  estado,
  menu,
  setHumedad,
  setA_W,
  setFactor,
  setDensidad,
  setColor,
  humedad,
  aw,
  factor,
  dencidad,
  color,
  Estadolectura,
  servicio
}) => {
  const [Huemdad, setHuemdad] = useState(humedad);
  const [A_W, setA_w] = useState(aw);
  const [Factor, setfactor] = useState(factor || []);
  const [malla18, setmalla18] = useState();
  const [malla17, setmalla17] = useState();
  const [malla16, setmalla16] = useState();
  const [malla15, setmalla15] = useState();
  const [malla14, setmalla14] = useState();
  const [malla13, setmalla13] = useState();
  const [malla12, setmalla12] = useState();
  const [malla0, setmalla0] = useState();
  const [pesoInicial, setPesoInicial] = useState();
  const [Densidad, setdensidad] = useState(dencidad);
  const [Agtrom, setAgtrom] = useState();
  const [Color, setcolor] = useState(color);
  const [l, setl] = useState();
  const [a, seta] = useState();
  const [b, setb] = useState();
  const [c, setc] = useState();
  const [h, seth] = useState();
  const [Curva_granu, setCurva_granu] = useState();
  const [Peso, setPeso] = useState();
  const [Tipo_tueste, setTipo_tueste] = useState();
  const [idTueste, setidtueste] = useState();
  const [listTueste, setlistaTueste] = useState([]);
  //const [servicio, setservicio] = useState(estado);
  const [idcultivo, setidcultivo] = useState();
  // const [estadolectura, setEstadolectura] = useState(Estadolectura);
  const [menit, setmenut] = useState(false);
  let objet = {};

  useEffect(() => {
    if (color) {
      try {
        objet = JSON.parse(Color);
        const valor = objet[0];
        setl(valor.l);
        seta(valor.a);
        setb(valor.b);
        setc(valor.c);
        seth(valor.h);
       // console.log(valor.l);
      } catch (err) {
        console.log("");
      }
    }
  }, []);
  useEffect(() => {
    if (factor) {
      try {
        objet = JSON.parse(factor);
        const valor = objet[0];
        setPesoInicial(valor.pesoInicia);
        setmalla18(valor.malla18);
        setmalla17(valor.malla17);
        setmalla16(valor.malla16);
        setmalla15(valor.malla15);
        setmalla14(valor.malla14);
        setmalla13(valor.malla13);
        setmalla12(valor.malla12);
        setmalla0(valor.malla0);
       
       // console.log(valor.l);
      } catch (err) {
        console.log("");
      }
    }
  }, []);

  useEffect(() => {
    setHumedad(Huemdad);
    setA_W(A_W);
    setFactor(Factor);
    setDensidad(Densidad);
    setColor(Color);
  }, [Huemdad, A_W, Factor, Densidad, Color]);
  useEffect(() => {
    const guardarColor = () => {
      setcolor([{ l: l, a: a, b: b, c: c, h: h }]);
      //console.log(color);
    };
    guardarColor();
  }, [l, a, b, c, h]);
  useEffect(() => {
    setfactor([{
      pesoInicia: pesoInicial,
      malla18: malla18,
      malla17: malla17,
      malla16: malla16,
      malla15: malla15,
      malla14: malla14,
      malla13: malla13,
      malla12: malla12,
      malla0: malla0,
    }]);
  }, [malla18, malla17, malla16, malla15, malla14, malla13, malla12, malla0,pesoInicial]);

  return (
    <>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *Humedad Relativa %:{" "}
          </span>
          <input
            type="number"
            min="0"
            value={Huemdad || ""}
            onChange={(event) => {
              setHuemdad(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="Humedad %"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *A.W:{" "}
          </span>
          <input
            type="number"
            min="0"
            value={A_W || ""}
            onChange={(event) => {
              setA_w(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="A.W"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *Densidad (kg/m³):{" "}
          </span>
          <input
            type="number"
            min="0"
            value={Densidad || ""}
            onChange={(event) => {
              setdensidad(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="Densidad"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <hr />
            <div className="mb-2">
              Color (Cielab)
            </div>
        <div className="input-group mb-3">
          <div className="row">
            <div className="col-3">
              <span className="input-group-text " id="basic-addon1">
                L*:{" "}
              </span>
              <span className="input-group-text " id="basic-addon1">
                a*:{" "}
              </span>
              <span className="input-group-text " id="basic-addon1">
                b*:{" "}
              </span>
              <span className="input-group-text " id="basic-addon1">
                c*:{" "}
              </span>
              <span className="input-group-text " id="basic-addon1">
                h*:{" "}
              </span>
            </div>
            
            <div className="col-5">
              <input
                type="number"
                value={l || ""}
                onChange={(event) => {
                  setl(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                value={a || ""}
                onChange={(event) => {
                  seta(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                value={b || ""}
                onChange={(event) => {
                  setb(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                value={c || ""}
                onChange={(event) => {
                  setc(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                value={h || ""}
                onChange={(event) => {
                  seth(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <hr />
        {servicio === "trilla"? <>
        
        <div className="mb-3">*Factor de Rendimiento</div>
        <div className="input-group mb-3" style={{justifyContent:'center'}}>
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
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
          </div>
          <div className="row">
            <div className="col-2 mb-4">
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 18:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 17:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 16:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 15:{" "}
              </span>
            </div>
            <div className="col-3">
              <input
                type="number"
                min="0"
                value={malla18 || ""}
                onChange={(event) => {
                  setmalla18(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla17 || ""}
                onChange={(event) => {
                  setmalla17(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla16 || ""}
                onChange={(event) => {
                  setmalla16(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla15 || ""}
                onChange={(event) => {
                  setmalla15(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="col-2">
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 14:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 13:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 12:{" "}
              </span>
              <span className="input-group-text mb-1 " id="basic-addon1">
                Malla 0:{" "}
              </span>
            </div>
            <div className="col-3">
              <input
                type="number"
                min="0"
                value={malla14 || ""}
                onChange={(event) => {
                  setmalla14(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla13 || ""}
                onChange={(event) => {
                  setmalla13(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla12 || ""}
                onChange={(event) => {
                  setmalla12(event.target.value);
                }}
                className="form-control mb-1"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                type="number"
                min="0"
                value={malla0 || ""}
                onChange={(event) => {
                  setmalla0(event.target.value);
                }}
                className="form-control"
                readOnly={Estadolectura}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="chart-container factor">
              <GraphFactor Lista={["0","Malla 18","Malla 17","Malla 16","Malla 15","Malla 14","Malla 13","Malla 12","Malla 0"]}
                            MaFactor={[0,((malla18/pesoInicial)*100),((malla17/pesoInicial)*100),((malla16/pesoInicial)*100),((malla15/pesoInicial)*100),((malla14/pesoInicial)*100),((malla13/pesoInicial)*100),((malla12/pesoInicial)*100),((malla0/pesoInicial)*100)]}/>
            </div>
          </div>
        </div>
        </>: undefined }
      </div>
    </>
  );
};
