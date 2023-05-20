import { set } from "lodash";
import { React, useState, createContext } from "react";

const UserContext = createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });

  const login = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
