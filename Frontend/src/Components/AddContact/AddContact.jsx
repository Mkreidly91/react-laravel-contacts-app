import React, { useState } from 'react';
import { addContact } from '../../helpers/async.helpers';
import { toBase64 } from '../../helpers/input.helpers';

/* 
TODOS:
 - Image preview, split the form in half image on the right
 - Recieve Image on the backend, save in public
 - handle error display
 - Display success message
 - Fix Styling
                
*/
const AddContact = () => {
  const [data, setData] = useState({
    name: '',
    number: '',
    location: '',
    img: '',
  });

  async function onImageChange(e) {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    console.log(base64);
    setData((prev) => ({ ...prev, img: base64 }));
  }

  function textInputHandler(e) {
    const { value, name } = e.target;
    console.log(e.target.value);
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function save() {}
  const { name, number, location } = data;
  return (
    <div className="form flex flex-col gap-10 bg-gray-600 p-10">
      <input
        className="w-60 "
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <input
        className="w-60 "
        type="text"
        name="name"
        value={name}
        onChange={textInputHandler}
      />
      <input
        name="number"
        value={number}
        className="w-60 "
        type="text"
        onChange={textInputHandler}
      />
      <input
        name="location"
        value={location}
        className="w-60 "
        type="text"
        onChange={textInputHandler}
      />
      <div className="flex gap-10">
        <div className="button">SAVE</div>
        <div
          className="button"
          onClick={() => {
            console.log('clicked');
            addContact(data);
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default AddContact;
