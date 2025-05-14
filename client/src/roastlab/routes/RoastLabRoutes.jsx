
import { Navbar } from '../components'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Formulario, Mainpage, SearchPages, ExportPage, FormProduccion } from '../pages'
import { FormMenu } from '../pages/FormMenu'
import { FormCultivo } from '../pages/FormCultivo'
import { FormSensorial } from '../pages/FormSensorial'
import { FormRecibido } from '../pages/FormRecibido'
import { FormTrilla } from '../pages/FormTrilla'
import { FormTueste } from '../pages/FormTueste'
import { FormFermentacion } from '../pages/FormFermentacion'
import { FormSecado } from '../pages/FormSecado'
import { useEffect } from 'react'


export const RoastLabRoutes = () => {
  // useEffect(() => {
  //   sessionStorage.setItem('lastRoute', window.location.pathname);
  // }, []);
  return (
    <>
        <Navbar />
        <Routes>    
            <Route path="add" element={ <Formulario/> }/>
            <Route path="Produccion" element={ <FormProduccion/> }/>
            <Route path="cultivo" element={ <FormCultivo/> }/>
            <Route path="Agregar" element={ <FormMenu/> }/>
            <Route path="inicio" element={ <Mainpage/>}  />
            <Route path="search" element={ <SearchPages/> }/>
            <Route path="export" element={ <ExportPage/> }/>
            <Route path='qualify' element={<FormSensorial/>}/>
            <Route path='trilla' element={<FormTrilla/>}/>
            <Route path='recibido' element={<FormRecibido/>}/>
            <Route path='tueste' element={<FormTueste/>}/>
            <Route path='fermentacion' element={<FormFermentacion/>}/>
            <Route path='secado' element={<FormSecado/>}/>
            <Route path="*" element={ <Navigate to="/inicio" replace/> }/>
        </Routes>
    </>
  )
}