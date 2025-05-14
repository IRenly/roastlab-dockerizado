import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Dropdown } from "bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { FormCultivo } from "./FormCultivo";
import { AddProduccion } from "../helpers/post/AddProduccion";
import { UpdateProduccion } from "../helpers/update";
import { GetIdPro } from "../helpers/get/Get_Id_Pro";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { ComprobarCC } from "../helpers/post/ComprobarCC";
import { icon } from "leaflet";
import { GiSave } from "react-icons/gi";
import { GrDocumentUpdate } from "react-icons/gr";

export const FormProduccion = (props) => {
  const [Id, setId] = useState(props.Id);
  const [Area_Cul, setArea_cul] = useState(props.Area_Cul || "");
  const [Tipo_pro, setTipo_Pro] = useState(props.Tipo_pro || "");
  const [Vereda, setVereda] = useState(props.Vereda || "");
  const [Altitud, setAltitud] = useState(props.Longitud || -75.82798);
  const [Latitud, setLatitud] = useState(props.Latitud || 4.33447);
  const [Coordenadas, setCoordenadas] = useState([Latitud, Altitud]);
  const [BusquedaCoordenadas, setBusquedaCoordenadas] = useState(true);
  const [Ccper, setCcper] = useState(props.Cedula);
  const [estadobutton, setEstadobutton] = useState(props.estados || false);
  const [estadolectura, setEstadolectura] = useState(props.estados || false);
  const [menuCultivo, setmenuCultivo] = useState(false);
  const inicioRef= useRef()
  useEffect(() => {
    if (Ccper === undefined) {
      comprobarcedula();
    }
  }, []);
  const scroll = () =>{
    setTimeout(()=>{
      if(inicioRef.current){
        inicioRef.current.scrollIntoView({behavior:'smooth'})
      }
    },100)
  }
  const validarcc = (valor) => {
    ComprobarCC(valor).then((response) => {
      if (response === true) {
        Swal.fire({
          icon: "success",
          title: ` Cédula: ${valor} encontrada`,
          text: `Ya puedes guardar una nueva producción`,
          timer: 2000,
          showConfirmButton: false,
        });
        setCcper(valor);
      } else {
        condicion();
      }
    });
  };
  const condicion = () => {
    if (Ccper === undefined) {
      Swal.fire({
        title: "La cédula no se encuentra registrada en la base de datos",
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
      title: "Ingrese Cédula",
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

  const SetMarkerCoor = () => {
    const position = [Latitud, Altitud];
    // console.log("Su posicion es: " + Coordenadas);
    const map = useMap();
    map.flyTo(position);
    return (
      <Marker position={position}>
        <Popup>Estas en {Latitud + ", " + Altitud}</Popup>
      </Marker>
    );
  };

  const SetMarker = () => {
    const map = useMap();
        if (!map) return;
        map.on("click", (e) => {
          if (e.latlng.lng != null && e.latlng.lat != null) {
            const longitud = e.latlng.lng
            setAltitud(longitud)
            const latitud =  e.latlng.lat
            setLatitud(latitud)
            setCoordenadas([latitud, longitud])
          }
        });
        //console.log("GRAN PUTA VIDAAAAAAAAA   "+Coordenadas);
    return (
      <Marker position={[Latitud, Altitud]}>
        <Popup>
          Estas Aquí {Latitud} y {Altitud}{" "}
        </Popup>
      </Marker>
    );
  };

  const Mapa = () => {
    console.log(Latitud+" "+Altitud+" MAPA");
    return (
      <>
        <MapContainer center={[Latitud, Altitud]} zoom={15}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <SetMarker />
        </MapContainer>
      </>
    );
  };

  const MapaCor = () => {
    // console.log(Coordenadas + " MAPA COOR");
    return (
      <>
        <MapContainer center={Coordenadas || [4.33447, -75.82798]} zoom={15}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <SetMarkerCoor />
        </MapContainer>
      </>
    );
  };

  const estados = () => {
    if (estadobutton === false) {
      setEstadobutton(true);
      setEstadolectura(true);
    } else if (estadobutton === true && estadolectura === true) {
      setEstadolectura(false);
      GetIdPro(Ccper, setId);
      Swal.fire({
        icon: "info",
        title: "Actualizar",
        text: "Se han habilitado los campos para realizar las respectivas modificaciones.",
      });
    } else if (estadobutton === true && estadolectura === false) {
      UpdateProduccion(
        Id,
        Area_Cul,
        Tipo_pro,
        Vereda,
        Coordenadas
      );
      setEstadolectura(true);
    }
  };

  const menuSig = () => {
    if (
      Area_Cul !== "" &&
      Tipo_pro !== "" &&
      Vereda !== "" &&
      Coordenadas !== ""
    ) {
      AddProduccion(
        Area_Cul,
        Tipo_pro,
        Vereda,
        Coordenadas,
        Ccper,
        setEstadobutton,
        setEstadolectura,
        setmenuCultivo
      );
      scroll()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por Favor, asegurate de haber rellenado todos los campos.",
        timer: 2000,
      });
    }
  };
  return (
    <>
      <div className="container p-3">
        <div className="card text-center">
          <div className="card-header">Datos Producción</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text col-3" id="basic-addon1">
                Area Cultivada ( Hectareas ) :{" "}
              </span>
              <div className="col-3">
              <input
                type="number"
                value={Area_Cul || ""}
                onChange={(event) => {
                  setArea_cul(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Digite el Numero de Areas Cultivadas"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>
              <span className="input-group-text col-2" id="basic-addon1">
                Tipo Producto:{" "}
              </span>
              {Tipo_pro === "" ? (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                >
                  {"Produccion"}
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary dropdown-toggle col-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={estadolectura}
                >
                  {Tipo_pro}
                </button>
              )}

              <ul className="dropdown-menu col-4">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setTipo_Pro("Especiales");
                  }}
                >
                  Especiales
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setTipo_Pro("Tradicionales");
                  }}
                >
                  Tradicionales
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setTipo_Pro("Ambos");
                  }}
                >
                  Ambos
                </li>
              </ul>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text col-2" id="basic-addon1">
                Vereda:{" "}
              </span>
              <div className="col-3">
              <input
                type="text"
                value={Vereda || ""}
                onChange={(event) => {
                  setVereda(event.target.value);
                }}
                readOnly={estadolectura}
                className="form-control"
                placeholder="Ingrese el Nombre de la Vereda"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              </div>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ height: "40px", marginBottom:'4px', gap:'1px'}}
            >
              <span
                className="input-group-text col-2 justify-content-center"
                id="basic-addon1"
              >
                Ubicación:{""}
              </span>
              <input
                type="number"
                readOnly={estadolectura}
                className="form-control"
                placeholder="Ingrese la Latitud"
                aria-label="Latitud"
                aria-describedby="basic-addon1"
                id="LatitudHTML"
                defaultValue={Latitud}
              />
              <input
                type="number"
                readOnly={estadolectura}
                className="form-control"
                placeholder="Ingrese la Longitud"
                aria-label="Longitud"
                aria-describedby="basic-addon1"
                id="AltitudHTML"
                defaultValue={Altitud}
              />
              <button
                className="btn btn-danger me-md-2"
                style={{
                  fontSize: "15px",
                  width: "50vh",
                  alignItems: "center",
                }}
                type="button"
                disabled={estadolectura}
                onClick={() => {
                  const Altitud = document.getElementById("AltitudHTML").value
                  setAltitud(Altitud)
                  const Latitud = document.getElementById("LatitudHTML").value
                  setLatitud(Latitud)
                  setCoordenadas([Latitud, Altitud])
                  console.log(Coordenadas)
                  setBusquedaCoordenadas(true)
                }}
              >
                Buscar
              </button>
              <button
                className="btn btn-danger me-md-2"
                style={{
                  fontSize: "15px",
                  width: "50vh",
                  alingItems: "center",
                }}
                type="button"
                disabled={estadolectura}
                onClick={() => {
                  setBusquedaCoordenadas(false)
                  console.log(BusquedaCoordenadas)
                  console.log("COORDENADAS ACTUALES:        "+Coordenadas)
                }}
              >
                Buscar Mapa
              </button>
            </div>
            <div className="" style={{ alignContent: "center" }}>
              {BusquedaCoordenadas === true ? <MapaCor /> : <Mapa />}
            </div>
            <div className="input-group mb-3 justify-content-center">
              <h6 className="m-1">{Latitud}, {Altitud} </h6>
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
      {menuCultivo === true ? <div ref={inicioRef} style={{height:'500px'}}><FormCultivo Cedula={Ccper} /></div> : <h2></h2>}
    </>
  );
};
