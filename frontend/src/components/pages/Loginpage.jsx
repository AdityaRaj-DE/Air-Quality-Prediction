import React, { useContext, useState } from "react";
import { UserLoginContext } from "../../context/LoginContext";
import ButtonMain from "../tools/ButtonMain";

const LoginPage = () => {
  const { setLogin } = useContext(UserLoginContext);
  const [admin, setAdmin] = useState([
    { id: "Adi2002", password: "123456" },
    { id: "Vai2004", password: "654321" },
  ]);
  const [userInput, setUserInput] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUser = admin.some(
      (user) => user.id === userInput.id && user.password === userInput.password
    );

    if (isValidUser) {
      setLogin(1); // Set login to 1 if credentials match
      setError(""); // Clear any previous errors
    } else {
      setError("Invalid ID or Password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#1e1e1e]">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white dark:bg-[#242424] p-8 rounded-3xl shadow-xl w-80">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="id"
              placeholder="Enter ID"
              value={userInput.id}
              onChange={handleChange}
              required
              className="p-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#242424] rounded-xl focus:outline-zinc-600 dark:focus:outline-zinc-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userInput.password}
              onChange={handleChange}
              required
              className="p-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#242424] rounded-xl focus:outline-zinc-600 dark:focus:outline-zinc-400"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <ButtonMain value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
