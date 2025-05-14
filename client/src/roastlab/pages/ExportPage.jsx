import { ExportUsuarios } from "../helpers/get/ExportUsuarios";
import { ExportTodo } from "../helpers/get/ExportTodo";
import { useState } from "react";
import { MdOutlineSimCardDownload } from 'react-icons/md'
import Swal from "sweetalert2";

export const ExportPage = () => {
  const exportarMuestra = () => {
    Swal.fire({
        title: "Por favor, ingrese el código de la muestra",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if (inputValue) {
            ExportTodo(inputValue);
          }
        },
        allowOutsideClick: false,
      })
    
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
            <div className="col-auto">
        <div className="card" style={{width: '18rem', background:'#808080'}}>
          <div className="card-body">
            <h5 className="card-title">Exportar Lista de Usuarios</h5>
            <p className="card-text">
            Descarga una lista completa con la información de cada usuario.
            </p>
            <a href="#" className="btn btn-primary float-left" onClick={ExportUsuarios}>
              Descargar < MdOutlineSimCardDownload  size={25}/>
            </a>
          </div>
        </div>
        </div>
        <div className="col-auto ">
        <div className="card " style={{width: '18rem', background:'#808080'}}>
          <div className="card-body ">
            <h5 className="card-title">Exportar Una Muestra</h5>
            <p className="card-text">
            Descarga una lista completa de todos datos relacionados con el código que se le indique.
            </p>
            <a href="#" className="btn btn-primary float-left " onClick={exportarMuestra}>
              Descargar < MdOutlineSimCardDownload  size={25}/>
            </a>
          </div>
        </div>
        </div>
        </div>
        {/* <div className="display-flex">
          <button className="btn btn-primary" onClick={ExportUsuarios}>
            exportar Usuarios
          </button>
          <button className="btn btn-primary  mx-3" onClick={exportarMuestra}>
            exportar Todo
          </button>
        </div> */}
      </div>
    </>
  );
};
