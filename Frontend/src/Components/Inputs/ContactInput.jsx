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
      <div className="error">{error}</div>
    </div>
  );
};

export default ContactInput;
