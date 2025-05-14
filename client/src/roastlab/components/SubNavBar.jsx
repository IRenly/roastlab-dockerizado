import React from "react";
import "./StyleSubNav.css";

export const SubNavBar = ({ scroll, IdFermentacion, IdSecado,IdRecibido,IdTrilla,IdTueste, promedio }) => {
  return (
    <nav className="nav rounded  ">
      <a
        className="btn"
        onClick={() => {
          scroll("inicio");
        }}
      >
        Sociodemográfico
      </a>
      <a
        className="btn"
        onClick={() => {
          scroll("produccion");
        }}
      >
        Producción
      </a>
      <a
        className="btn"
        onClick={() => {
          scroll("cultivo");
        }}
      >
        Cultivo
      </a>
      {
        IdFermentacion !== null? 
        <a
        className="btn"
        onClick={() => {
          scroll("fermentado");
        }}
      >
        Fermentación
      </a>:
      <a
      className="btn"
      style={{background:'#FF6565'}}
      onClick={() => {
        scroll("fermentado");
      }}
    >
      Fermentación
    </a>
      }
      {
        IdSecado!==null? 
        <a
        className="btn"
        onClick={() => {
          scroll("secado");
        }}
      >
        Secado
      </a>:
       <a
       className="btn"
       style={{background:'#FF6565'}}
       onClick={() => {
         scroll("secado");
       }}
     >
       Secado
     </a>
      }
      {
        IdRecibido!==null?
        <a
        className="btn"
        onClick={() => {
          scroll("recibido");
        }}
      >
        Caracterización
      </a>:
        <a
        className="btn"
        style={{background:'#FF6565'}}
        onClick={() => {
          scroll("recibido");
        }}
      >
        Caracterización
      </a>
     }
     {
      IdTrilla !== null?
      <a
        className="btn"
        onClick={() => {
          scroll("trilla");
        }}
      >
        trilla
      </a>:
      <a
      className="btn"
      style={{background:'#FF6565'}}
      onClick={() => {
        scroll("trilla");
      }}
    >
      trilla
    </a>
     }
    {
      IdTueste!==null?
      <a
        className="btn"
        onClick={() => {
          scroll("tueste");
        }}
      >
        tueste
      </a>:
      <a
      className="btn"
      style={{background:'#FF6565'}}
      onClick={() => {
        scroll("tueste");
      }}
    >
      tueste
    </a>

    }
    {
      promedio>0?
      <a
        className="btn"
        onClick={() => {
          scroll("sensorial");
        }}
      >
        Sensorial
      </a>:
      <a
      className="btn"
      style={{background:'#FF6565'}}
      onClick={() => {
        scroll("sensorial");
      }}
    >
      Sensorial
    </a>

    }
      
    </nav>
  );
};
