import React from "react";

const ButtonMain = ({ value }) => {
  return (
    <button
      type="submit"
      className="p-2 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-zinc-600 dark:hover:bg-zinc-300"
    >
      {value}
    </button>
  );
};

export default ButtonMain;
