import { useState } from 'react';
import './App.css';
import Cards from './Components/Cards';
import ContactsPage from './Pages/ContactsPage';
import AddContact from './Pages/AddContact';
import Map from './Pages/Map';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="h-full rubik">
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="addContact" element={<AddContact />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
