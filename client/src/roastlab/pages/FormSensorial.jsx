import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RadarGraph } from "../components/graficas/RadarGraph";
import { ComprobarMuestra } from "../helpers/post/ComprobarMuestra";
import { GiSave } from "react-icons/gi";

export const FormSensorial = (props) => {
  const [Codigo, setCodigo] = useState(props.Muestra || "");
  const [Fragancia, setFragancia] = useState(props.Fragancia || 0);
  const [Acidez, setAcidez] = useState(props.Acidez ||0);
  const [Dulzor, setDulzor] = useState(props.Dulzor || 0);
  const [Sabor, setsabor] = useState(props.Sabor || 0);
  const [Cuerpo, setCuerpo] = useState(props.Cuerpo || 0);
  const [Uniformidad, setUniformidad] = useState(props.Uniformidad ||0);
  const [Sabor_residual, setSabor_residual] = useState(props.SaborRecidual || 0);
  const [Balance, setBalance] = useState(props.Balance ||0);
  const [Taza_Limpia, setTaza_Limpia] = useState(props.Tazalimpia || 0);
  const [Total, setTotal] = useState(props.Total);
  const [idCultivo, setidCultivo] = useState();
  const [Puntajecatador, setPuntajecatador] = useState(props.Catador || 0);
  const [Editable, setEditable] = useState(false);
  useEffect(()=>{
    if(Codigo === ""){
      setEditable(true)
      }else{
        setEditable(false)
      }
  },[Codigo])

  useEffect(() => {
    
    // const cultivo = () => {
    //   axios.get("http://localhost:3001/idcultivo").then((response) => {
    //     response.data.map((val) => {
    //       setidCultivo(val.id);
    //     });
    //   });
    // };
    // cultivo();
    if (Codigo === "") {
      comprobarMuestra()
    }
  }, []);
  const validarMuestra = (valor) => {
    ComprobarMuestra(valor).then((response) => {
      if (response === true) {
        Swal.fire({
          icon: "success",
          title: `Muestra: ${valor} encontrada`,
          text: `Ya puedes comenzar a calificar la muestra`,
          timer: 2000,
          showConfirmButton: false,
        });
        setCodigo(valor);
        console.log(Codigo);
      } else {
        condicion();
      }
    });
  };
  const condicion = () => {
    if (Codigo === "") {
      Swal.fire({
        title: "la muestra no se encuentra en la base de datos",
        icon: "error",
        showCancelButton: true,
        cancelButtonColor: "Minimal",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Reintentar",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if (inputValue) {
            comprobarMuestra();
            console.log(Codigo);
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
  const comprobarMuestra = () => {
    Swal.fire({
      title: "Ingresa el código de la muestra",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (inputValue) {
          validarMuestra(inputValue);
        }
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.history.back();
      }
    });
  };

  const Guardar = async () => {
    
    try{
       const response = axios.post(`${import.meta.env.VITE_API_URL}/sensorial`, {
         Fragancia: Fragancia,
         Acidez: Acidez,
         Dulzor: Dulzor,
         Sabor: Sabor,
         Cuerpo: Cuerpo,
         Uniformidad: Uniformidad,
         Sabor_residual: Sabor_residual,
         Balance: Balance,
         Tazalimpia: Taza_Limpia,
         Catador: Puntajecatador,
         Total: Total,
         idCultivo: Codigo,
       })
       Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i> La calificación para la muestra ${Codigo} se agregó con éxito</i> `,
        icon: "success",
        timer: 3000,
      });

    }catch(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente mas tarde"
              : JSON.parse(JSON.stringify(error)).message,
        });
      }
  };

  const menuSig = () => {
    if (
      Fragancia !== undefined &&
      Acidez !== undefined &&
      Dulzor !== undefined &&
      Sabor !== undefined &&
      Cuerpo !== undefined &&
      Uniformidad !== undefined &&
      Sabor_residual !== undefined &&
      Balance !== undefined &&
      Taza_Limpia !== undefined &&
      Total !== undefined&&
      Puntajecatador
    ) {
      Guardar();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Porfavor llena todos los campos",
      });
    }
  };
 useEffect(()=>{
  const SumarTotal = () => {
    const suma =
      Fragancia +
      Acidez +
      Dulzor +
      Sabor +
      Cuerpo +
      Uniformidad +
      Sabor_residual +
      Balance +
      Taza_Limpia
    return suma;
    
  };
  setTotal(SumarTotal())
 },[Fragancia,Acidez,
  Dulzor,
  Sabor,
  Cuerpo,
  Uniformidad,
  Sabor_residual,
  Balance,
  Taza_Limpia])
  

  return (
    <>
    <div className="container p-3">
      <div className="card text-center">
        <div className="card-header">Hoja de Calificación (Puntaje de 0 - 15)</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text col-2  " id="basic-addon1">
              Fragancia:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Fragancia || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setFragancia(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Fragancia"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Acidez:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Acidez || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setAcidez(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Acidez"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Dulzor:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Dulzor || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setDulzor(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Dulzor"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text col-2  " id="basic-addon1">
              Sabor:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Sabor || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setsabor(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Sabor"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Cuerpo:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Cuerpo || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setCuerpo(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Cuerpo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Uniformidad:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Uniformidad || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setUniformidad(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Uniformidad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text col-2  " id="basic-addon1">
              Sabor Residual:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Sabor_residual || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setSabor_residual(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Sabor Residual"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Balance:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Balance || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setBalance(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Balance"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <span className="input-group-text col-2  " id="basic-addon1">
              Taza limpia:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Taza_Limpia || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                setTaza_Limpia(parseFloat(event.target.value));
              }}
              className="form-control"
              placeholder="Taza Limpia"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            
          </div>
          <div className=" input-group   ">
          <span className="input-group-text col-2  " id="basic-addon1">
              Puntaje Catador:{" "}
            </span>
            <input
              type="number"
              min="0"
              max="15"
              value={Puntajecatador || ""}
              readOnly={Editable}
              onChange={(event) => {
                if(event.target.value <=15 && event.target.value >=0)
                  setPuntajecatador(parseFloat(event.target.value));
                
              }}
              className="form-control "
              placeholder="Puntaje del catador"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          
          <div className="container p-3">
            <div className="card text-center">
              <div className="card-header">Puntaje SCAA</div>
              <div className="card-body container d-flex justify-content-center ">
                <div
                  className="containerGraph"
                  id="Grafico"
                  style={{ width: "100vh", height: "50vh" }}
                >
                  <RadarGraph
                    Fragancia={Fragancia}
                    Acidez={Acidez}
                    Dulzor={Dulzor}
                    Sabor={Sabor}
                    Cuerpo={Cuerpo}
                    Uniformidad={Uniformidad}
                    Sabor_Residual={Sabor_residual}
                    Balance={Balance}
                    Taza_Limpia={Taza_Limpia}
                  />
                </div>
                <div
                  className=" form-control form-control-lg"
                  style={{ border: "0px" }}
                >
                  <input
                    type="number"
                    value={Total}
                    readOnly
                    className="form-control form-control-sm"
                    placeholder="Total...."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
                    <button
                      className="btn btn-danger me-md-2"
                      type="button"
                      disabled = {Editable}
                      onClick={() => {
                        menuSig();
                      }}
                    >
                     <GiSave size={20} /> Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
