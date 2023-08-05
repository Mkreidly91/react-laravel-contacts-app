import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import data from '../dummy-data';

import { fetchContacts, deleteContact } from '../helpers/async.helpers';
const Cards = () => {
  const [contacts, setContacts] = useState();

  const deleteCard = async (id) => {
    const newContacts = contacts.filter((element) => element.id != id);
    setContacts(newContacts);
    deleteContact(id);
  };

  useEffect(() => {
    fetchContacts(setContacts);
  }, []);

  const cards = () => {
    if (contacts) {
      return contacts.map((contact) => (
        <Card key={contact.name} contact={contact} del={deleteCard} />
      ));
    }
  };

  return (
    <div className="flex flex-wrap gap-5 justify-start py-20">{cards()}</div>
  );
};

export default Cards;
