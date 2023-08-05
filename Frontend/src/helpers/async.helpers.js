import axios from 'axios';

const fetchContacts = async (stateSetter) => {
  const res = await axios.get('http://127.0.0.1:8000/api/contacts/getAll');
  stateSetter(res.data.contacts);
};

const deleteContact = async (id) => {
  const res = await axios.post(
    `http://127.0.0.1:8000/api/contacts/delete/${id}`
  );
  return;
};

const addContact = async (data) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/contacts/add',
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export { fetchContacts, deleteContact, addContact };
