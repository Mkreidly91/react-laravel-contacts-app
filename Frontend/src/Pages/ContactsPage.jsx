import React, { useState } from 'react';

import Cards from '../Components/Cards';
import plus from '../assets/icons/plus-circle.svg';
const ContactsPage = (props) => {
  return (
    <div className="page-container  h-full pink p-40 ">
      <div className="flex justify-between items-center">
        <div className="text-2xl">Contacts</div>
        <div className="controls flex gap-4 items-center">
          <input
            className="bg-slate-300 rounded placeholder:text-center placeholder:text-gray-500 p-1"
            type="search"
            placeholder="search here"
          />
          <img src={plus} alt="" />
          <div>edit contacts</div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default ContactsPage;
