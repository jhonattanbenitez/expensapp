import React from "react";

type InputTextProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Adding the onChange type
};

const InputText = ({
  id,
  name,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      className="bg-slate-100 p-2"
      value={value}
      onChange={onChange} // Using the passed onChange handler
    />
  );
};

export default InputText;
