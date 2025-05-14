import { SearchCard } from "../components/SearchCard"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import { useForm } from '../../hooks/useForm'
import { Buscar } from "../helpers/post/Buscar"
import { useEffect, useRef, useState } from "react"
import { Resultado } from "./Resultado"
import Formulario from "./Formulario"
import { FormProduccion } from "./FormProduccion"
import { FormCultivo } from "./FormCultivo"
import { FormFermentacion } from "./FormFermentacion"
import { FormSecado } from "./FormSecado"
import { FormBeneficio } from "./FormBeneficio"
import { FormRecibido } from "./FormRecibido"
import { FormTrilla } from "./FormTrilla"
import { FormTueste } from "./FormTueste"
import './estilos.css'
import {AiOutlineSearch} from 'react-icons/ai'
import Swal from "sweetalert2"
import { SubNavBar } from "../components"
import { Promedios } from "../helpers/post/Promedios"
import { FormSensorial } from "./FormSensorial"

export const SearchPages = () => {
  const [busar, setbuscar]= useState()
  const [resultado, setresultado]= useState(false)
  const [ListaDatos, setListaDatos]= useState([])
  const [ListaPromedios, setListaPromedios]= useState([])
  const iniciRef = useRef(null)
  const produccion = useRef(null)
  const cultivo = useRef(null)
  const fermentado = useRef(null)
  const secado = useRef(null)
  const recibido = useRef(null)
  const trilla = useRef(null)
  const tueste = useRef(null)
  const sensorial = useRef(null)
  const scroll = (element) => {
     let ref
     switch (element) {
      case 'inicio':
         ref = iniciRef
        break;
        case 'produccion':
          ref = produccion
          break;
      case 'cultivo':
      ref=cultivo
      break;
      case 'fermentado':
         ref = fermentado
        break;
        case 'secado':
         ref = secado
        break;
        case 'recibido':
         ref = recibido
        break;
        case 'trilla':
         ref = trilla
        break;
        case 'tueste':
         ref = tueste
        break;
        case 'sensorial':
         ref = sensorial
        break;

      default:
        ref=null
        break;
    }
    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
 

  useEffect(()=>{
      if(ListaDatos.length !== 0){
        setresultado(true)
        
      }else{
        setresultado(false)
      }
  },[ListaDatos])

const onSearchSubmit = (event) =>{
   event.preventDefault();
  
  if(busar !== undefined){
    setListaDatos([])
  Buscar(busar,setListaDatos)
  setListaPromedios([])
  Promedios(busar,setListaPromedios)
   
  }
  else{
    setresultado(false)
  }
  
}
const promedio = ListaPromedios.length

  return (
    <>
    <div className="input-group mb-3 div-search" style={{height:'3vh'}}>
      <span className="input-group-text col-2 span-search">Buscar</span>
      <input type="text" className="form-control-sm input-search" placeholder="Buscar..." 
      onChange={(val)=>{
        setbuscar(val.target.value)
      }} required/>
      <button className="btn btn-warning btn-search" onClick={onSearchSubmit}><AiOutlineSearch size={27}/></button>
    </div>
    {
      ListaDatos.length > 0? 
      <div className="container"> 
      {
        console.log(ListaPromedios)
      }
        <SubNavBar scroll={scroll} 
        IdFermentacion={ListaDatos[0].ID_Fermentado}
        IdSecado={ListaDatos[0].ID_Secado}
        IdRecibido={ListaDatos[0].ID_Recibido}
        IdTrilla={ListaDatos[0].ID_Trilla}
        IdTueste={ListaDatos[0].ID_Tueste}
        promedio={promedio}
        />
       {/* {console.log(ListaDatos)} */}
      <div ref={iniciRef} style={{marginBottom: "8rem"}} >  </div>
      <Formulario 
       Cedula={ListaDatos[0].cedula}
       Nombre={ListaDatos[0].nombre_persona}
       Telefono={ListaDatos[0].tel}
       Email={ListaDatos[0].email}
       Genero={ListaDatos[0].genero}
       Municipio={ListaDatos[0].nombre_mun}
       IdMun={ListaDatos[0].ID_Mun}
       estados={true}
       />
       <div ref={produccion} style={{marginBottom: "8rem"}}></div>
        <FormProduccion 
       Id={ListaDatos[0].ID_Area_Pro}
       Cedula={ListaDatos[0].cedula}
       Area_Cul={ListaDatos[0].num_areascul}
       Tipo_pro={ListaDatos[0].tipo_produccion}
       Vereda= {ListaDatos[0].vereda}
       Latitud={ListaDatos[0].latitud}
       Longitud={ListaDatos[0].longitud}
       estados={true}
       />
       <div ref={cultivo} style={{marginBottom: "8rem"}}></div>
       <FormCultivo 
        Id={ListaDatos[0].ID_Cultivo}
        Hectareas={ListaDatos[0].hectareas}
        Cedula={ListaDatos[0].cedula}
        Variedad={ListaDatos[0].nombre_variedad}
        Idvariedad={ListaDatos[0].ID_Variedad}
        Edad_Cul={ListaDatos[0].edad_cultivo}
        Altura_SNM={ListaDatos[0].altura_snm}
        Fertilizacion={ListaDatos[0].fertilizacion}
        Organico={ListaDatos[0].organico}
        Tipo={ListaDatos[0].Nombre_Beneficio}
        Idtipo={ListaDatos[0].ID_TipoBen}
        Estado_muestra={ListaDatos[0].estado_muestra}
        estados={true}
       /> 
       <div ref={fermentado} style={{marginBottom: "8rem"}}></div>
        {
          ListaDatos[0].ID_Fermentado=== null?
          <FormFermentacion cultivo={ListaDatos[0].ID_Cultivo} estados={false}  search={true}
          />:
          <FormFermentacion 
          Id_fermentado={ListaDatos[0].ID_Fermentado}
          Temperatura={ListaDatos[0].Temp_Fermentado}
          Fermentacion={ListaDatos[0].fermentacion}
          PH={ListaDatos[0].PH_Fermentado}
          GradosB={ListaDatos[0].GradosB_Fermentado}
          Microorganismos={ListaDatos[0].microorganismos}
          Culturing={ListaDatos[0].culturing}
          info_micro={ListaDatos[0].info_microorganismo}
          info_culturing={ListaDatos[0].info_culturing}
          estados={true}
          />
        }
       <div ref={secado} style={{marginBottom: "8rem"}}> </div>
       {
        ListaDatos[0].ID_Secado === null?
         <FormSecado cultivo={ListaDatos[0].ID_Cultivo} estados={false} search={true} 
        />:
        <FormSecado 
       Id_secado={ListaDatos[0].ID_Secado}
       Temp_secado={ListaDatos[0].Temp_Secado}
       Tipo_secado={ListaDatos[0].tipo_secado}
       Humedad_rela={ListaDatos[0].Humedad_Secado}
       Temperatura={ListaDatos[0].temp_ambiente}
       Tipo_combustible={ListaDatos[0].Nombre_TipoCombustible}
       Id_combustible={ListaDatos[0].ID_TipoCombustible}
       Tipo_silo={ListaDatos[0].Nombre_TipoSilo}
       Id_silo={ListaDatos[0].ID_TipoSilo}
       Secado_continuo={ListaDatos[0].secado_continuo}
       estados={true}
       />
       }
       <div ref={recibido} style={{marginBottom: "8rem"}}> </div>
        {
          ListaDatos[0].ID_Recibido === null?
          <FormRecibido 
          Id_Muestra={ListaDatos[0].ID_Cultivo}
        Estado_muestra={ListaDatos[0].estado_muestra}
        estados={false}
        desdebuscar={true}
          />:
          
       <FormRecibido 
        ID= {ListaDatos[0].ID_Recibido}
        Id_Muestra={ListaDatos[0].ID_Cultivo}
        Estado_muestra={ListaDatos[0].estado_muestra}
        Fecha={ListaDatos[0].fecha_recibido}
        Humedad={ListaDatos[0].Humedad_Recibido}
        Aw={ListaDatos[0].AW_Recibido}
        Factor_Muestra={ListaDatos[0].Factor_Recibido}
        Dencidad={ListaDatos[0].Densidad_Recibido}
        Color={ListaDatos[0].Color_Recibido}
        GradosB={ListaDatos[0].GradosB_Recibido}
        pH={ListaDatos[0].PH_Recibido}
        Acidez={ListaDatos[0].Acidez_Recibido}
        Info={ListaDatos[0].Info_Recibido}
        estados={true}
        desdebuscar={true}
       />
        }
       <div ref={trilla} style={{marginBottom: "8rem"}}> </div>
       {ListaDatos[0].ID_Trilla === null? <FormTrilla
       
        Id_Muestra={ListaDatos[0].ID_Cultivo}
        Estado_muestra={ListaDatos[0].estado_muestra}
        estados={false}
        
      
      /> : <FormTrilla
      ID={ListaDatos[0].ID_Trilla}
      Id_Muestra={ListaDatos[0].ID_Cultivo}
      Estado_muestra={ListaDatos[0].estado_muestra}
      Humedad={ListaDatos[0].Humedad_Trilla}
      AW={ListaDatos[0].AW_Trilla}
      Densidad={ListaDatos[0].Densidad_Trilla}
      Color={ListaDatos[0].Color_Trilla}
      GradosB={ListaDatos[0].GradosB_Trilla}
      PH={ListaDatos[0].PH_Trilla}
      Acidez={ListaDatos[0].Acidez_Trilla}
      Factor={ListaDatos[0].Factor_Trilla}
      Info={ListaDatos[0].Info_Trilla}
      estados={true}
    
    /> }
    <div ref={tueste} style={{marginBottom: "8rem"}}> </div>
    {ListaDatos[0].ID_Tueste === null? <FormTueste
       
       Id_Muestra={ListaDatos[0].ID_Cultivo}
       Estado_muestra={ListaDatos[0].estado_muestra}
       estados={false}
       
     
     /> : <FormTueste
     ID={ListaDatos[0].ID_Tueste}
     Id_Muestra={ListaDatos[0].ID_Cultivo}
     Estado_muestra={ListaDatos[0].estado_muestra}
     Humedad={ListaDatos[0].Humedad_Tueste}
     AW={ListaDatos[0].AW_Tueste}
     Densidad={ListaDatos[0].Densidad_Tueste}
     Color={ListaDatos[0].Color_Tueste}
     GradosB={ListaDatos[0].GradosB_Tueste}
     PH={ListaDatos[0].PH_Tueste}
     Acidez={ListaDatos[0].Acidez_Tueste}
     Info={ListaDatos[0].Info_Tueste}
      Agdrom={ListaDatos[0].Agtrom_tueste}
      Curva={ListaDatos[0].curva_granulometrica}
     estados={true}
     
   /> }
    <div ref={sensorial} style={{marginBottom: "8rem"}}> </div>
   {
    ListaPromedios.length > 0? 
    <FormSensorial 
     Muestra={ListaDatos[0].ID_Cultivo}
     Acidez={ListaPromedios[0].PromedioAcidez}
     Balance={ListaPromedios[0].PromedioBalance}
     Catador={ListaPromedios[0].PromedioCatador}
     Cuerpo={ListaPromedios[0].PromedioCuerpo}
     Dulzor={ListaPromedios[0].PromedioDulzo}
     Sabor={ListaPromedios[0].PromedioSabor}
     SaborRecidual={ListaPromedios[0].PromedioSaborResidual}
     Tazalimpia={ListaPromedios[0].PromedioTazalimpia}
     Total={ListaPromedios[0].PromedioTotal}
     Uniformidad={ListaPromedios[0].PromedioUniformidad}
     Fragancia={ListaPromedios[0].promedioFragancia}
    />:
    undefined
   }
    
      
       
      </div>
      : undefined
    }
    </>
  )
}
