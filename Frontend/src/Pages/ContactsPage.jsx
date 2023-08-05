import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../helpers/async.helpers';
import Cards from '../Components/Cards';
import plus from '../assets/icons/plus-circle.svg';
import { Link } from 'react-router-dom';

const ContactsPage = (props) => {
  const [contacts, setContacts] = useState();
  const [contactData, setContactData] = useState();

  useEffect(() => {
    fetchContacts(setContacts);
  }, []);

  const addCard = () => {};
  return (
    <div className="page-container  h-full pink p-40 ">
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-bold">Contacts</div>
        <div className="controls flex gap-4 items-center">
          <input
            className="bg-slate-300 rounded placeholder:text-center placeholder:text-gray-500 p-1"
            type="search"
            placeholder="search here"
          />
          <Link to="/some-where" state={setContacts}>
            <img src={plus} alt="" />
          </Link>

          <div>edit contacts</div>
        </div>
      </div>
      <Cards contacts={contacts} setContacts={setContacts} />
    </div>
  );
};

export default ContactsPage;
