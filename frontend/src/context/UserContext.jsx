import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [campsites, setCampsites] = useState();
  const [listing, setListing] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        campsites,
        setCampsites,
        listing,
        setListing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
/* {user?.token ? children : "not logged in"} */
