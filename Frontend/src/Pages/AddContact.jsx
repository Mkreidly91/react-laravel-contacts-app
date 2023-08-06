import React, { useEffect, useState, useRef, Fragment } from 'react';
import { addContact } from '../helpers/async.helpers';
import { toBase64 } from '../helpers/input.helpers';
import { Combobox, Transition } from '@headlessui/react';
import noImage from '../assets/images/no-image.png';
import pointer from '../assets/icons/pointer.svg';
import axios from 'axios';
import ContactInput from '../Components/Inputs/ContactInput';
import { Link } from 'react-router-dom';
import '../index.css';
const initialData = {
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
};

const initialErrors = {
  name: '',
  number: '',
  'location.coordinats.lat': '',
  'location.coordinats.lon': '',
  'location.name': '',
};

const AddContact = () => {
  const [data, setData] = useState(initialData);

  const [queryLocations, setQueryLocations] = useState([]);
  const [errors, setErrors] = useState(initialErrors);

  console.log(errors);
  const timeout = useRef();
  const fileInput = useRef();

  function refreshState() {
    if (fileInput.current) fileInput.current.value = '';

    setData(initialData);
    setQueryLocations([]);
    setErrors(initialErrors);
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
    if (!errors) {
      refreshState();
      return;
    }

    setErrors({
      ...errors,
    });
  }

  const { name, number, location } = data;
  return (
    <div>
      <div className="form flex place-content-start gap-20 px-20 pt-20 ">
        <div className="input-wrapper flex flex-col justify-center gap-10 self-start">
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold pb-2">
                Location
              </label>
              <Combobox.Input
                className={`  relative font-inherit shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors['location.name'] && 'border-red-500'
                }`}
                id="grid-first-name"
                name="location"
                value={data.location.name}
                onChange={(e) => {
                  e.stopPropagation();
                  textInputHandler(e);
                  handleDebounceSearch();
                }}
              />
              <img
                className="w-[16px] h-[16px] absolute top-[55%] right-2"
                src={pointer}
                alt=""
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
                        className="p-2"
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
              className={'w-24 font-normal '}
            />
            <ContactInput
              name="lat"
              label="lat"
              value={data.location.coordinates.lat}
              type="text"
              onChange={textInputHandler}
              className={'w-24 font-normal'}
            />
          </div>
          <div className="error flex flex-col font-normal text-red-700 text-sm">
            <div>{errors['location.coordinates.lat']}</div>
            <div> {errors['location.coordinates.lon']}</div>
            <div>{errors['location.name']}</div>
          </div>
        </div>
        <div className="image-select-preview flex flex-col rounded gap-10 min-w-[300px]">
          <img
            src={data.img ? data.img : noImage}
            alt=""
            className="rounded aspect-square w-[300px] h-[300px]"
          />

          <input
            ref={fileInput}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs bg-purple-200 "
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </div>
      </div>
      <div className="flex gap-10 px-20">
        <div
          className="button bg-purple-500 text-xl text-white p-5 px-10 rounded-full "
          onClick={save}
        >
          SAVE
        </div>
        <Link to="/">
          <div className="button text-gray-400 font-semibold text-xl p-5 px-10">
            Cancel
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddContact;
