import React, { useEffect, useState, useRef, Fragment } from 'react';
import { addContact } from '../../helpers/async.helpers';
import { toBase64 } from '../../helpers/input.helpers';
import { Combobox, Transition } from '@headlessui/react';
import noImage from '../../assets/images/placeholder.png';
import axios from 'axios';
import ContactInput from '../Inputs/ContactInput';

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
    img: '',
    location: {
      name: '',
      coordinates: {
        lon: '',
        lat: '',
      },
    },
  });

  const [queryLocations, setQueryLocations] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    'location.coordinats.lat': '',
    'location.coordinats.lon': '',
    'location.name': '',
  });

  console.log(errors);
  const timeout = useRef();

  function errorHandler() {
    const { name, number, location } = data;
    const {
      name: location_name,
      coordinates: { lon, lat },
    } = location;

    const textInputs = [name, number];
    const locationInputs = [];
  }

  async function handleDebounceSearch(e) {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      if (!data.location) return;
      const location = await axios(
        `https://geocode.maps.co/search?q=${data.location.name}`
      );

      const locations = location.data.map(({ display_name, lon, lat }) => {
        return {
          name: display_name,
          coordinates: {
            lon,
            lat,
          },
        };
      });

      setQueryLocations(locations);
    }, 1000);
  }

  async function onImageChange(e) {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    setData((prev) => ({ ...prev, img: base64 }));
  }

  function textInputHandler(e) {
    const { value, name } = e.target;
    const isLocationBased =
      name === 'lon' || name === 'lat' || name === 'location';
    console.log(value, name);

    // contact name - number
    if (!isLocationBased) {
      setData((prev) => ({ ...prev, [name]: value }));
    }

    // Location name
    else if (name === 'location') {
      setData((prev) => ({
        ...prev,
        location: { ...prev.location, name: value },
      }));
    }

    // Longtitude-Latitude
    else if (name === 'lat' || name === 'lon') {
      setData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: { ...prev.location.coordinates, [name]: value },
        },
      }));
    }
  }

  function handleSelect(e) {
    setData((prev) => ({ ...prev, location: e }));
  }

  async function save() {
    const trimmedData = {
      name: data.name.trim(),
      number: data.number.trim(),
      img: data.img,
      location: {
        name: data.location.name.trim(),
        coordinates: {
          lon: data.location.coordinates.lon.trim(),
          lat: data.location.coordinates.lat.trim(),
        },
      },
    };

    const { errors } = await addContact(trimmedData);
    console.log(errors);
    if (!errors) return;

    setErrors({
      ...errors,
    });
  }

  const { name, number, location } = data;
  return (
    <div className="form flex place-content-center gap-10 bg-gray-600 p-10">
      <div className="input-wrapper flex flex-col justify-center gap-10">
        <ContactInput
          name="name"
          label="Name"
          value={name}
          type="text"
          onChange={textInputHandler}
          error={errors.name}
        />
        <ContactInput
          name="number"
          label="Number"
          value={number}
          type="text"
          onChange={textInputHandler}
          error={errors.number}
        />
        <Combobox name="select" value={data.location} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="w-full  rounded border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              name="location"
              value={data.location.name}
              onChange={(e) => {
                e.stopPropagation();
                textInputHandler(e);
                handleDebounceSearch();
              }}
            />
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className={
                  'absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                }
              >
                {queryLocations &&
                  queryLocations.map((location, index) => (
                    <Combobox.Option
                      key={location.coordinates.lon}
                      value={location}
                    >
                      {location.name}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="flex gap-10">
          <ContactInput
            name="lon"
            label="Lon"
            value={data.location.coordinates.lon}
            type="text"
            onChange={textInputHandler}
            // error={errors.lon}
            className={'w-24'}
          />
          <ContactInput
            name="lat"
            label="lat"
            value={data.location.coordinates.lat}
            type="text"
            onChange={textInputHandler}
            // error={errors.lat}
            className={'w-24'}
          />
        </div>
        <div className="error font-normal text-red-700 text-sm">
          {errors['location.coordinates.lat']}
          {errors['location.coordinates.lon']}
          {errors['location.name']}
        </div>

        <div className="flex gap-10">
          <div className="button" onClick={save}>
            SAVE
          </div>
          <div className="button">Cancel</div>
        </div>
      </div>
      <div className="image-select-preview flex flex-col w-[300px]  rounded">
        <img
          src={data.img ? data.img : noImage}
          alt=""
          className="w-full h-full rounded"
        />
        <input
          className="w-60 "
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};

export default AddContact;
