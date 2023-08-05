import { useState } from 'react';
import './App.css';
import Cards from './Components/Cards';
import ContactsPage from './Pages/ContactsPage';
function App() {
  return (
    <div className="h-full">
      <ContactsPage>
        <Cards />
      </ContactsPage>
    </div>
  );
}

export default App;
