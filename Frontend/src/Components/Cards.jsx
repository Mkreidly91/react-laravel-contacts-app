import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import data from '../dummy-data';
import { deleteContact } from '../helpers/async.helpers';
const Cards = ({ contacts, setContacts }) => {
  const deleteCard = async (id) => {
    const newContacts = contacts.filter((element) => element.id != id);
    setContacts(newContacts);
    deleteContact(id);
  };

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
