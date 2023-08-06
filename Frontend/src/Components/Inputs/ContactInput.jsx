import React from 'react';

const ContactInput = ({
  name,
  label,
  value,
  onChange,
  error,
  type,
  className,
}) => {
  const isArray = Array.isArray(error);
  return (
    <div className="input-container flex flex-col gap-2 font-semibold">
      <label>{label}</label>
      <input
        name={name}
        value={value}
        className={`w-60 rounded ${className}`}
        type={type}
        onChange={onChange}
      />
      {isArray ? (
        error.map((e, index) => (
          <div key={index} className="error font-normal text-red-700 text-sm">
            {e}
          </div>
        ))
      ) : (
        <div className="error font-normal text-red-700 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ContactInput;
