import React, { useState } from 'react'
import { useEffect } from 'react'
import { GetUltimas3Muestras } from '../helpers/get/Get3Muestras'
import './Muestras.css'

export const MuestraCard = ({ID_Muestra, cedula, edad_cultivo,email,genero,Nombre_Persona, nombre_mun, nombre_variedad, vereda}) => {
  return (
    <div className="col animateanimated animatefadeIn">
                <div className="card" style={{borderColor:'#3C2A21', backgroundColor: '#d7c3b4', borderWidth:'3px', boxShadow:'0px 0px 32px 13px rgba(0,0,0,0.20)'}}>
                    <div className="row no-gutters">
                        <div className="">
                            <div className="card-body">
                            <div className="box stack-top"></div>
                                <h1 className="card-title" style={{color: '#3C2A21', fontSize:'50px'}}>{ID_Muestra}</h1>
                                <hr />
                                <h1 style={{textAlign: 'center', fontSize:'15px', margin:'0px'}}><b>Datos Del Productor</b></h1>
                                <h5 style={{fontSize:'40px', margin:'0px'}}>{Nombre_Persona}</h5>
                                <h6 style={{margin:'0px'}}>C.C: {cedula}</h6>
                                <h6 style={{margin:'0px'}}>{genero}</h6>
                                <h6 style={{marginTop:'0px',marginBottom:'0px'}}>{email}</h6>
                                <h6>Municipio: {nombre_mun}</h6>
                                <hr />
                                <h1 style={{textAlign: 'center', fontSize:'15px', margin:'0px'}}><b>Datos Del Cultivo</b></h1>
                                <h1 style={{fontSize:'40px', margin:'0px'}}>{nombre_variedad}</h1>
                                <h6 style={{margin:'0px'}}>Vereda: {vereda}</h6>
                                <h6 style={{margin:'0px'}}>Edad del Cultivo: {edad_cultivo} Años</h6> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}
