import React, { useEffect, useState } from 'react';
import Card from './Card';
import data from '../dummy-data';
import axios from 'axios';

const Cards = () => {
  const [contacts, setContacts] = useState();

  const fetchContacts = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/contacts/getAll');
    setContacts(res.data.contacts);
  };

  const deleteContact = async (id) => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/contacts/delete/${id}`
    );
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const cards = () => {
    if (contacts) {
      return contacts.map((contact) => (
        <Card key={contact.name} contacts={contact} />
      ));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center p-10 ">{cards()}</div>
  );
};

export default Cards;
