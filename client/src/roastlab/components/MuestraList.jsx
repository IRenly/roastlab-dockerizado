import { useMemo, useState, useEffect } from 'react';
import { GetUltimas3Muestras } from '../helpers/get/Get3Muestras';
import { MuestraCard } from './MuestraCard';

export const MuestraList = () => {
    const [Data, setData] = useState([])
    useEffect(()=>{
        GetUltimas3Muestras(setData)
    },[1])
   
    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3'>
            {
                Data.map(Muestra =>(
                    <MuestraCard key={Muestra.ID_Muestra}
                    {...Muestra}/>
                ))
            }
        </div>
    )
}