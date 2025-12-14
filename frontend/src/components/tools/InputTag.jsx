import React from "react";

const InputTag = ({ type, step, name, placeholder, value, onChange }) => {
  return (
    <input
      className="px-3 py-2 mx-3 my-2 bg-zinc-50 dark:bg-[#242424] rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:border-zinc-500"
      type={type}
      step={step}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default InputTag;
