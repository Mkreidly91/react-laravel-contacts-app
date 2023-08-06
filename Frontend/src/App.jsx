import { useState } from 'react';
import './App.css';
import Cards from './Components/Cards';
import ContactsPage from './Pages/ContactsPage';
import AddContact from './Components/AddContact/AddContact';
import { Routes, Route } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="h-full monster">
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="addContact" element={<AddContact />} />
        <Route
          path="/map"
          element={
            <div className="">
              <MapContainer
                className=""
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]} draggable>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
