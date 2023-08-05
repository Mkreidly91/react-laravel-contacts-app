import React, { useState } from 'react';
//image, name, number, address, locaation
const Card = (props) => {
  const { name, number, location, image_url } = props.contacts;
  return (
    <div className="card-container flex flex-col items-center p-5 rounded-2xl neumorphismlight">
      <div className="image-container w-[200px] flex justify center">
        <img className="w-full rounded-xl" src={image_url} alt="" />
      </div>
      <div className="contact-details text-center text-sm font-normal">
        <div className="flex flex-col ">
          <span className="name font-semibold ">{name}</span>
          <span className="number">{number}</span>
        </div>
        <span className="location">{location}</span>
      </div>
    </div>
  );
};

export default Card;
