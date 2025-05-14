import { Link } from "react-router-dom"
import { MuestraCard } from "../components/MuestraCard"
import { MuestraList } from "../components/MuestraList"
import './estilos.css'
export const Mainpage= () => {
    return(
        <>
        <div className="p-4 div-main">
          <h1 className="h1-main">Últimas Tres Muestras Agregadas</h1>
        </div>
          <div className="mb-4 div-maincard">
            <MuestraList />
          </div>

        </>
    )
}