import { useState } from 'react';
import './App.css';
import Cards from './Components/Cards';
import ContactsPage from './Pages/ContactsPage';
import AddContact from './Components/AddContact/AddContact';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="h-full monster">
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="addContact" element={<AddContact />} />
      </Routes>
    </div>
  );
}

export default App;
