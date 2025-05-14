import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet"
import './Mapa.css'
import { useState } from "react"
import { useEffect } from "react";

const GetCoordinates = () => {
  const map = useMap();
  const [altitud, setAltitud] = useState(-75.827980)
  const [latitud, setLatitud] = useState(4.334470)
  const coordenadas=latitud+","+altitud
  useEffect(() => {
    if (!map) return;
    map.on('click', (e) => {
      if (e.latlng.lng != null && e.latlng.lat != null) {
        setAltitud(e.latlng.lng)
        setLatitud(e.latlng.lat)
      }
    })
  }, [map])
  console.log(coordenadas);
  return(
    <Marker position={[latitud,altitud]}>
      <Popup>Estas Aquí {latitud} y {altitud} </Popup>
    </Marker>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function Mapa() {
  return (
    <>
      <MapContainer center={[4.334470,-75.827980]} zoom={15}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=d85a36bd-7751-4598-bc36-931831f60c60"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'/>
      <GetCoordinates />
      </MapContainer>
    </>
  )
}

export default Mapa
