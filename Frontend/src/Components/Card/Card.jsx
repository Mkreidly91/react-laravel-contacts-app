import React, { useState } from 'react';
//image, name, number, address, locaation
import trash from '../../assets/icons/trash-2 copy.svg';
import phone from '../../assets/icons/phone-call.svg';
import Location from '../../assets/icons/location-1.svg';
import { deleteContact } from '../../helpers/async.helpers';

import './Card.css';
const Card = (props) => {
  const { contact, del } = props;
  const { name, number, location, image_url, id } = contact;

  return (
    <div className="card-container relative flex flex-col items-center justify-between bg-white p-5 rounded-2xl neumorph">
      <img
        color="white"
        className="delete w-[18px] h-[18px] absolute top-8 right-8 grow"
        src={trash}
        alt=""
        onClick={() => {
          del(id);
        }}
      />
      <div className="image-container w-[150px] flex justify center">
        <img className="w-full rounded-xl" src={image_url} alt="" />
      </div>
      <div className="contact-details text-center text-sm font-normal">
        <div className="flex flex-col gap-3">
          <span className="name font-semibold ">{name}</span>
          <div className="info-wrapper flex flex-col gap-1">
            <div className="icon-container flex gap-2">
              <img className=" w-[18px] h-[18px]" src={phone} alt="" />
              <span className="number">{number}</span>
            </div>
            <div className="icon-container flex gap-2">
              <img className=" w-[18px] h-[18px]" src={Location} alt="" />
              <span className="location">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
