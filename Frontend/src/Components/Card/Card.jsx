import React, { useState } from 'react';
import trash from '../../assets/icons/trash-2 copy.svg';
import phone from '../../assets/icons/phone-call.svg';
import Location from '../../assets/icons/location-1.svg';
import { deleteContact } from '../../helpers/async.helpers';
import { Link } from 'react-router-dom';
import noImage from '../../assets/images/Artwork_1.png';

import './Card.css';
const Card = (props) => {
  const { contact, del } = props;
  const { name, number, location, image_url, id } = contact;
  const parsedLocation = JSON.parse(location);

  const {
    name: location_name,
    coordinates: { lon, lat },
  } = parsedLocation;

  return (
    <div className="card-container relative flex flex-col items-center justify-between bg-white p-5 rounded-2xl neumorph width-[300px] min-w-[300px] max-w-[300px]">
      <img
        color="white"
        className="delete w-[22px] h-[22px] absolute top-4 right-4 grow"
        src={trash}
        alt=""
        onClick={() => {
          del(id);
        }}
      />

      <div className="image-container w-[200px] aspect-square flex justify center">
        <img
          className="w-full rounded-xl"
          src={image_url === 'data:;base64,' ? noImage : image_url}
          alt=""
        />
      </div>
      <div className="contact-details text-sm font-normal">
        <div className="flex flex-col gap-3">
          <span className="name font-semibold text-lg mt-3">{name}</span>
          <div className="info-wrapper flex flex-col gap-3">
            <div className="icon-container flex items-center gap-3">
              <img className=" w-[20] h-[20]" src={phone} alt="" />
              <span className="number">{number}</span>
            </div>
            <div className="icon-container flex  items-center gap-3">
              <Link to="/map" state={{ lon, lat, name, number, location_name }}>
                <img className=" w-[20] h-[20]" src={Location} alt="" />
              </Link>
              <span className="location w-full">{location_name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
