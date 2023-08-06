import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';

const Map = () => {
  const { state } = useLocation();
  const { name, number, lon, lat, location_name } = state;
  console.log(state);
  return (
    <div className="">
      <MapContainer
        className=""
        center={[lon, lat]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lon, lat]} draggable>
          <Popup>
            <div>
              <img src="" alt="" />
              <h3>{name}</h3>
              <p>{location_name}</p>
              <p>{number}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
