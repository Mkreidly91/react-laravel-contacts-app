import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../helpers/async.helpers';
import Cards from '../Components/Cards';
import plus from '../assets/icons/plus-circle.svg';
import search from '../assets/icons/search.svg';

import { Link } from 'react-router-dom';

const ContactsPage = (props) => {
  const [contacts, setContacts] = useState();
  const [contactData, setContactData] = useState();

  useEffect(() => {
    fetchContacts(setContacts);
  }, []);

  const addCard = () => {};
  return (
    <div className="page-container  h-full bg-gray-100 p-20 ">
      <div className="flex justify-between items-center ">
        <div className="text-3xl font-extrabold  text-purple-500 ">
          Contacts
        </div>
        <div className="controls flex gap-4 items-center">
          <div className="relative">
            <img
              src={search}
              className="absolute left-2 top-[50%] translate-y-[-50%] w-[20px] h-[20px]"
              alt=""
            />
            <input
              className=" rounded-full placeholder:text-center placeholder:text-gray-700 p-3"
              type="search"
              placeholder="search here"
            />
          </div>

          <Link to="/addContact">
            <a
              href="#_"
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                Add Contact
              </span>
              <span className="relative invisible">Button Text</span>
            </a>
          </Link>
        </div>
      </div>
      <Cards contacts={contacts} setContacts={setContacts} />
    </div>
  );
};

export default ContactsPage;
