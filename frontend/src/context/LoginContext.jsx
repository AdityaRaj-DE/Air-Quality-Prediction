import React, { createContext, useState } from "react";

export const UserLoginContext = createContext();

const LoginContext = (props) => {
  const [login, setLogin] = useState(0);

  return (
    <UserLoginContext.Provider value={{ login, setLogin }}>
      {props.children}
    </UserLoginContext.Provider>
  );
};

export default LoginContext;
